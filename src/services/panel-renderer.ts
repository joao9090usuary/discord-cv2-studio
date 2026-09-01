import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  MediaGalleryBuilder,
  MediaGalleryItemBuilder,
  SectionBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  StringSelectMenuBuilder,
  TextDisplayBuilder,
  ThumbnailBuilder,
  type MessageActionRowComponentBuilder,
} from "discord.js";
import type { PanelButtonSpec, PanelSpec } from "../domain/panel.js";
import { getTheme, quoteMarkdown } from "./panel-themes.js";

const buttonStyles = {
  primary: ButtonStyle.Primary,
  secondary: ButtonStyle.Secondary,
  success: ButtonStyle.Success,
  danger: ButtonStyle.Danger,
} as const;

export function renderPanel(spec: PanelSpec, frameIndex = 0) {
  const frame = spec.animation.frames[frameIndex % spec.animation.frames.length];
  const marker = spec.animation.enabled && frame ? `${frame.marker} ` : "";
  const theme = getTheme(spec.theme);
  const container = new ContainerBuilder().setAccentColor(frame?.color ?? spec.color);

  const titlePrefix = theme.titlePrefix ? `${theme.titlePrefix} ` : "";
  const decoration = theme.topDecoration ? `${theme.topDecoration}\n` : "";
  const author = spec.author ? `-# ${spec.author}\n` : "";
  const heading = `${decoration}${author}# ${marker}${titlePrefix}${spec.title}`;

  if (spec.thumbnailUrl) {
    const section = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(heading),
        new TextDisplayBuilder().setContent(spec.description),
      )
      .setThumbnailAccessory(
        new ThumbnailBuilder()
          .setURL(spec.thumbnailUrl)
          .setDescription(`Miniatura de ${spec.title}`),
      );
    container.addSectionComponents(section);
  } else {
    container.addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`${heading}\n${spec.description}`),
    );
  }

  for (const section of (spec.sections ?? []).slice(0, 8)) {
    const shouldQuote = section.quote ?? theme.quoteSections;
    const sectionEmoji = section.emoji ? `${section.emoji} ` : `${theme.sectionBullet} `;
    const body = shouldQuote ? quoteMarkdown(section.body) : section.body;
    container
      .addSeparatorComponents(separator(true))
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(`## ${sectionEmoji}${section.heading}\n${body}`),
      );
  }

  const media = (spec.media ?? []).slice(0, 10);
  if (media.length > 0) {
    const gallery = new MediaGalleryBuilder().addItems(
      media.map((item) => {
        const builder = new MediaGalleryItemBuilder().setURL(item.url);
        if (item.description) builder.setDescription(item.description);
        if (item.spoiler) builder.setSpoiler(true);
        return builder;
      }),
    );
    container.addSeparatorComponents(separator(false)).addMediaGalleryComponents(gallery);
  }

  if (spec.options.length > 0) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId(`cv2-panel:${spec.id}`)
      .setPlaceholder(spec.placeholder)
      .setMinValues(1)
      .setMaxValues(1)
      .addOptions(
        spec.options.slice(0, 25).map((option) => ({
          label: option.label,
          value: option.value,
          ...(option.description ? { description: option.description } : {}),
          ...(option.emoji ? { emoji: option.emoji } : {}),
        })),
      );
    const selectRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(menu);
    container.addSeparatorComponents(separator(true)).addActionRowComponents(selectRow);
  }

  const buttons = (spec.buttons ?? []).slice(0, 5);
  if (buttons.length > 0) {
    const buttonRow = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
      buttons.map((button, index) => buildButton(spec.id, button, index)),
    );
    container.addActionRowComponents(buttonRow);
  }

  if (theme.bottomDecoration) {
    container.addTextDisplayComponents(
      new TextDisplayBuilder().setContent(theme.bottomDecoration),
    );
  }

  container
    .addSeparatorComponents(separator(false))
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(`-# ${spec.footer}`));

  return [container];
}

export function renderSelectionResponse(spec: PanelSpec, selectedValue: string) {
  const option = spec.options.find((item) => item.value === selectedValue);
  const content = option
    ? `## ${option.emoji ? `${option.emoji} ` : ""}${option.label}\n${option.response}`
    : "Esta opção não está mais disponível.";

  return [responseContainer(spec, content)];
}

export function renderButtonResponse(spec: PanelSpec, buttonIndex: number) {
  const button = spec.buttons?.[buttonIndex];
  const content = button?.response
    ? `## ${button.emoji ? `${button.emoji} ` : ""}${button.label}\n${button.response}`
    : "Esta ação não está mais disponível.";
  return [responseContainer(spec, content)];
}

export function renderHelp() {
  return [
    new ContainerBuilder()
      .setAccentColor(0x5865f2)
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          "# ✦ CV2 Studio\nCrie painéis profissionais com `/studio`, comece rapidamente com `/template` ou tenha controle total com `/painel`.",
        ),
      )
      .addSeparatorComponents(separator(true))
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          "## Recursos\n> **Temas:** `minimal`, `elegant`, `cute`, `gaming`, `rules`\n> **Mídia:** banner, miniatura e galeria\n> **Interação:** dropdown e até 5 botões\n> **Conteúdo:** até 8 seções com Markdown\n> **Animação:** `pulse`, `rainbow` ou `off`",
        ),
      )
      .addSeparatorComponents(separator(true))
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          "## Formatos avançados\n**Seções:** `Título|Texto|Emoji|sim >> Outra|Texto`\n**Botões:** `Rótulo|primary|Resposta|Emoji >> Site|link|https://...`\n**Opções:** `Rótulo|valor|Resposta|Descrição, Outra|valor|Resposta`",
        ),
      )
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          "-# Dica: envie um arquivo no parâmetro banner do comando /painel para obter o visual largo das referências.",
        ),
      ),
  ];
}

function buildButton(panelId: string, button: PanelButtonSpec, index: number): ButtonBuilder {
  const builder = new ButtonBuilder().setLabel(button.label);
  if (button.emoji) builder.setEmoji(button.emoji);
  if (button.style === "link" && button.url) {
    return builder.setStyle(ButtonStyle.Link).setURL(button.url);
  }
  return builder
    .setStyle(buttonStyles[button.style === "link" ? "secondary" : button.style])
    .setCustomId(`cv2-action:${panelId}:${index}`);
}

function responseContainer(spec: PanelSpec, content: string): ContainerBuilder {
  return new ContainerBuilder()
    .setAccentColor(spec.color)
    .addTextDisplayComponents(new TextDisplayBuilder().setContent(content));
}

function separator(divider: boolean): SeparatorBuilder {
  return new SeparatorBuilder()
    .setDivider(divider)
    .setSpacing(SeparatorSpacingSize.Small);
}
