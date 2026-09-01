import {
  LabelBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  type ModalSubmitInteraction,
} from "discord.js";

const fieldIds = {
  title: "studio-title",
  description: "studio-description",
  appearance: "studio-appearance",
  sections: "studio-sections",
  options: "studio-options",
} as const;

export function buildStudioModal(): ModalBuilder {
  return new ModalBuilder()
    .setCustomId("cv2-studio-create")
    .setTitle("CV2 Studio • Novo painel")
    .addLabelComponents(
      label(
        "Título",
        "O título principal do painel",
        new TextInputBuilder()
          .setCustomId(fieldIds.title)
          .setStyle(TextInputStyle.Short)
          .setPlaceholder("Central da Comunidade")
          .setMaxLength(180)
          .setRequired(true),
      ),
      label(
        "Descrição",
        "Texto de abertura; Markdown e emojis são aceitos",
        new TextInputBuilder()
          .setCustomId(fieldIds.description)
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder("Bem-vindo! Escolha uma opção abaixo.")
          .setMaxLength(2_000)
          .setRequired(true),
      ),
      label(
        "Visual",
        "Tema, cor e animação separados por ponto e vírgula",
        new TextInputBuilder()
          .setCustomId(fieldIds.appearance)
          .setStyle(TextInputStyle.Short)
          .setPlaceholder("tema: elegant; cor: #5865F2; animacao: rainbow; intervalo: 5s")
          .setMaxLength(300)
          .setRequired(false),
      ),
      label(
        "Seções e ações",
        "Seções com >>; botões podem ser incluídos depois do campo botoes:",
        new TextInputBuilder()
          .setCustomId(fieldIds.sections)
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder("secoes: Regras|Respeite todos.|📜|sim >> Eventos|Confira a agenda.|📅")
          .setMaxLength(1_500)
          .setRequired(false),
      ),
      label(
        "Dropdown",
        "Rótulo|valor|resposta|descrição; separe opções com vírgula",
        new TextInputBuilder()
          .setCustomId(fieldIds.options)
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder("Suporte|suporte|Seu atendimento começou.|Ajuda técnica, Regras|regras|Leia as regras.|Normas")
          .setMaxLength(1_500)
          .setRequired(false),
      ),
    );
}

export function studioModalToRequest(interaction: ModalSubmitInteraction): string {
  const title = interaction.fields.getTextInputValue(fieldIds.title);
  const description = interaction.fields.getTextInputValue(fieldIds.description);
  const appearance = interaction.fields.getTextInputValue(fieldIds.appearance);
  const sections = interaction.fields.getTextInputValue(fieldIds.sections);
  const options = interaction.fields.getTextInputValue(fieldIds.options);

  return [
    `titulo: ${title}`,
    `descricao: ${description}`,
    appearance,
    sections,
    options ? `opcoes: ${options}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function label(
  title: string,
  description: string,
  input: TextInputBuilder,
): LabelBuilder {
  return new LabelBuilder()
    .setLabel(title)
    .setDescription(description)
    .setTextInputComponent(input);
}
