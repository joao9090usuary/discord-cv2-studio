import {
  ChannelType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { templateChoices } from "./services/panel-templates.js";

export const commandBuilders = [
  new SlashCommandBuilder()
    .setName("painel")
    .setDescription("Cria um painel visual com Components V2 e dropdown")
    .addStringOption((option) =>
      option
        .setName("pedido")
        .setDescription("Descreva título, texto, cor, opções e animação")
        .setMaxLength(4_000)
        .setRequired(true),
    )
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription("Canal de destino (por padrão, o canal atual)")
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement),
    )
    .addBooleanOption((option) =>
      option
        .setName("privado")
        .setDescription("Mostra o painel somente para você (ignora o canal)"),
    )
    .addAttachmentOption((option) =>
      option
        .setName("banner")
        .setDescription("Imagem larga exibida dentro do painel"),
    )
    .addAttachmentOption((option) =>
      option
        .setName("miniatura")
        .setDescription("Imagem pequena exibida ao lado do título"),
    ),
  new SlashCommandBuilder()
    .setName("studio")
    .setDescription("Abre um formulário guiado para montar um painel rico"),
  new SlashCommandBuilder()
    .setName("template")
    .setDescription("Cria um painel profissional a partir de um modelo")
    .addStringOption((option) =>
      option
        .setName("modelo")
        .setDescription("Estilo de painel")
        .setRequired(true)
        .addChoices(...templateChoices),
    )
    .addAttachmentOption((option) =>
      option
        .setName("banner")
        .setDescription("Banner opcional para personalizar o modelo"),
    ),
  new SlashCommandBuilder()
    .setName("ajuda")
    .setDescription("Mostra a sintaxe e todos os recursos do CV2 Studio"),
  new SlashCommandBuilder()
    .setName("exemplo")
    .setDescription("Cria um painel CV2 de demonstração"),
  new SlashCommandBuilder()
    .setName("animacao")
    .setDescription("Inicia ou pausa a animação de um painel")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addStringOption((option) =>
      option
        .setName("painel_id")
        .setDescription("ID exibido na confirmação de criação")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("acao")
        .setDescription("O que fazer")
        .setRequired(true)
        .addChoices(
          { name: "Iniciar", value: "start" },
          { name: "Pausar", value: "stop" },
        ),
    ),
];

export const commandsJson = commandBuilders.map((command) => command.toJSON());
