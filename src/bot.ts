import { randomUUID } from "node:crypto";
import {
  Client,
  Events,
  GatewayIntentBits,
  MessageFlags,
  type Attachment,
  type ChatInputCommandInteraction,
  type GuildTextBasedChannel,
  type Interaction,
  type ModalSubmitInteraction,
} from "discord.js";
import type { CreatePanelInput, PanelSpec } from "./domain/panel.js";
import { AnimationManager } from "./services/animation-manager.js";
import {
  renderButtonResponse,
  renderHelp,
  renderPanel,
  renderSelectionResponse,
} from "./services/panel-renderer.js";
import type { PanelStore } from "./services/panel-store.js";
import { getPanelTemplate } from "./services/panel-templates.js";
import { parsePanelRequest } from "./services/request-parser.js";
import { buildStudioModal, studioModalToRequest } from "./services/studio-modal.js";

type PanelCreationInteraction = ChatInputCommandInteraction | ModalSubmitInteraction;

export function createBot(store: PanelStore): Client {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const animations = new AnimationManager(client, store);

  client.once(Events.ClientReady, (readyClient) => {
    animations.restoreAll();
    console.log(`Conectado como ${readyClient.user.tag}`);
    console.log(`${store.list().length} painel(is) restaurado(s).`);
  });

  client.on(Events.InteractionCreate, (interaction) => {
    void handleInteraction(interaction, store, animations).catch(async (error) => {
      console.error("Falha ao processar interação", error);
      if (!interaction.isRepliable()) return;
      const message = "Não consegui concluir essa ação. Confira o formato e tente novamente.";
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: message, flags: MessageFlags.Ephemeral }).catch(() => undefined);
      } else {
        await interaction.reply({ content: message, flags: MessageFlags.Ephemeral }).catch(() => undefined);
      }
    });
  });

  return client;
}

async function handleInteraction(
  interaction: Interaction,
  store: PanelStore,
  animations: AnimationManager,
): Promise<void> {
  if (interaction.isStringSelectMenu() && interaction.customId.startsWith("cv2-panel:")) {
    const panel = store.get(interaction.customId.slice("cv2-panel:".length));
    if (!panel) {
      await interaction.reply({ content: "Este painel não está mais registrado.", flags: MessageFlags.Ephemeral });
      return;
    }
    await interaction.reply({
      components: renderSelectionResponse(panel, interaction.values[0] ?? ""),
      flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2],
    });
    return;
  }

  if (interaction.isButton() && interaction.customId.startsWith("cv2-action:")) {
    const [, panelId, rawIndex] = interaction.customId.split(":");
    const panel = panelId ? store.get(panelId) : undefined;
    if (!panel) {
      await interaction.reply({ content: "Esta ação não está mais registrada.", flags: MessageFlags.Ephemeral });
      return;
    }
    await interaction.reply({
      components: renderButtonResponse(panel, Number.parseInt(rawIndex ?? "-1", 10)),
      flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2],
    });
    return;
  }

  if (interaction.isModalSubmit() && interaction.customId === "cv2-studio-create") {
    const input = parsePanelRequest(studioModalToRequest(interaction));
    await publishPanel(interaction, input, false, null, store, animations);
    return;
  }

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "studio") {
    await interaction.showModal(buildStudioModal());
    return;
  }

  if (interaction.commandName === "painel") {
    const request = interaction.options.getString("pedido", true);
    const isPrivate = interaction.options.getBoolean("privado") ?? false;
    const requestedChannel = interaction.options.getChannel("canal") as GuildTextBasedChannel | null;
    const banner = interaction.options.getAttachment("banner");
    const thumbnail = interaction.options.getAttachment("miniatura");
    if (!attachmentsAreImages(banner, thumbnail)) {
      await interaction.reply({
        content: "Banner e miniatura precisam ser arquivos de imagem (PNG, JPG, GIF ou WEBP).",
        flags: MessageFlags.Ephemeral,
      });
      return;
    }
    const input = applyAttachments(parsePanelRequest(request), banner, thumbnail);
    await publishPanel(interaction, input, isPrivate, requestedChannel, store, animations);
    return;
  }

  if (interaction.commandName === "template") {
    const templateName = interaction.options.getString("modelo", true);
    const template = getPanelTemplate(templateName);
    if (!template) {
      await interaction.reply({ content: "Modelo não encontrado.", flags: MessageFlags.Ephemeral });
      return;
    }
    const banner = interaction.options.getAttachment("banner");
    if (!attachmentsAreImages(banner)) {
      await interaction.reply({ content: "O banner precisa ser um arquivo de imagem.", flags: MessageFlags.Ephemeral });
      return;
    }
    const input = applyAttachments(template, banner);
    await publishPanel(interaction, input, false, null, store, animations);
    return;
  }

  if (interaction.commandName === "exemplo") {
    const example = getPanelTemplate("comunidade");
    if (example) await publishPanel(interaction, example, false, null, store, animations);
    return;
  }

  if (interaction.commandName === "ajuda") {
    await interaction.reply({
      components: renderHelp(),
      flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2],
    });
    return;
  }

  if (interaction.commandName === "animacao") {
    await controlAnimation(interaction, store, animations);
  }
}

async function publishPanel(
  interaction: PanelCreationInteraction,
  input: CreatePanelInput,
  isPrivate: boolean,
  requestedChannel: GuildTextBasedChannel | null,
  store: PanelStore,
  animations: AnimationManager,
): Promise<void> {
  if (!interaction.guildId) {
    await interaction.reply({ content: "Use este comando dentro de um servidor.", flags: MessageFlags.Ephemeral });
    return;
  }

  const channel = (requestedChannel ?? interaction.channel) as GuildTextBasedChannel | null;
  if (!isPrivate && (!channel || !channel.isTextBased() || channel.isDMBased())) {
    await interaction.reply({ content: "Escolha um canal de texto válido.", flags: MessageFlags.Ephemeral });
    return;
  }

  const panel: PanelSpec = {
    ...input,
    id: randomUUID().slice(0, 8),
    ownerId: interaction.user.id,
    guildId: interaction.guildId,
    channelId: channel?.id ?? interaction.channelId ?? "private",
    createdAt: new Date().toISOString(),
  };

  if (isPrivate) {
    const response = await interaction.reply({
      components: renderPanel(panel),
      flags: [MessageFlags.Ephemeral, MessageFlags.IsComponentsV2],
      withResponse: true,
    });
    const messageId = response.resource?.message?.id;
    if (messageId) panel.messageId = messageId;
    await store.save(panel);
    return;
  }

  if (requestedChannel && requestedChannel.id !== interaction.channelId) {
    const sent = await channel!.send({
      components: renderPanel(panel),
      flags: MessageFlags.IsComponentsV2,
    });
    panel.messageId = sent.id;
    await store.save(panel);
    animations.start(panel);
    await interaction.reply({
      content: `Painel criado em <#${channel!.id}>. ID: \`${panel.id}\``,
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  const response = await interaction.reply({
    components: renderPanel(panel),
    flags: MessageFlags.IsComponentsV2,
    withResponse: true,
  });
  const messageId = response.resource?.message?.id;
  if (messageId) panel.messageId = messageId;
  await store.save(panel);
  animations.start(panel);
  await interaction.followUp({
    content: `Painel criado. ID administrativo: \`${panel.id}\``,
    flags: MessageFlags.Ephemeral,
  });
}

function applyAttachments(
  input: CreatePanelInput,
  banner?: Attachment | null,
  thumbnail?: Attachment | null,
): CreatePanelInput {
  return {
    ...input,
    ...(banner
      ? {
          media: [
            { url: banner.url, description: banner.description ?? `Banner de ${input.title}` },
            ...(input.media ?? []),
          ].slice(0, 10),
        }
      : {}),
    ...(thumbnail ? { thumbnailUrl: thumbnail.url } : {}),
  };
}

function attachmentsAreImages(...attachments: Array<Attachment | null | undefined>): boolean {
  return attachments.every(
    (attachment) => !attachment || attachment.contentType?.startsWith("image/") === true,
  );
}

async function controlAnimation(
  interaction: ChatInputCommandInteraction,
  store: PanelStore,
  animations: AnimationManager,
): Promise<void> {
  const panelId = interaction.options.getString("painel_id", true);
  const action = interaction.options.getString("acao", true);
  const panel = store.get(panelId);
  if (!panel || panel.guildId !== interaction.guildId) {
    await interaction.reply({ content: "Painel não encontrado neste servidor.", flags: MessageFlags.Ephemeral });
    return;
  }

  const enabled = action === "start";
  const updated = await store.update(panelId, {
    animation: { ...panel.animation, enabled },
  });
  if (!updated) return;

  if (enabled) animations.start(updated);
  else animations.stop(panelId);

  await interaction.reply({
    content: `Animação ${enabled ? "iniciada" : "pausada"} no painel \`${panelId}\`.`,
    flags: MessageFlags.Ephemeral,
  });
}
