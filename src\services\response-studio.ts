import { randomUUID } from "node:crypto";
import {
  LabelBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  type ModalSubmitInteraction,
} from "discord.js";
import type {
  PanelResponseSpec,
  PanelResponseVisibility,
} from "../domain/panel.js";
import { truncate } from "../lib/text.js";
import { parsePanelRequest } from "./request-parser.js";
import type { ResponseTarget } from "./panel-responses.js";

const DRAFT_TTL_MS = 15 * 60_000;

const fieldIds = {
  title: "response-title",
  description: "response-description",
  appearance: "response-appearance",
  sections: "response-sections",
  extras: "response-extras",
} as const;

export interface ResponseDraft {
  id: string;
  panelId: string;
  target: ResponseTarget;
  userId: string;
  guildId: string;
  visibility: PanelResponseVisibility;
  banner?: { url: string; description?: string };
  thumbnailUrl?: string;
  expiresAt: number;
}

export type NewResponseDraft = Omit<ResponseDraft, "id" | "expiresAt">;

export class ResponseDraftStore {
  readonly #drafts = new Map<string, ResponseDraft>();

  public create(input: NewResponseDraft): ResponseDraft {
    this.#prune();
    const draft: ResponseDraft = {
      ...input,
      id: randomUUID().slice(0, 10),
      expiresAt: Date.now() + DRAFT_TTL_MS,
    };
    this.#drafts.set(draft.id, draft);
    return draft;
  }

  public take(id: string, userId: string, guildId: string | null): ResponseDraft | undefined {
    this.#prune();
    const draft = this.#drafts.get(id);
    if (!draft || draft.userId !== userId || draft.guildId !== guildId) return undefined;
    this.#drafts.delete(id);
    return draft;
  }

  #prune(): void {
    const now = Date.now();
    for (const [id, draft] of this.#drafts) {
      if (draft.expiresAt <= now) this.#drafts.delete(id);
    }
  }
}

export function buildResponseStudioModal(
  draftId: string,
  response: PanelResponseSpec,
): ModalBuilder {
  return new ModalBuilder()
    .setCustomId(`cv2-response-config:${draftId}`)
    .setTitle("CV2 Studio • Resposta completa")
    .addLabelComponents(
      label(
        "Título da resposta",
        "Título principal exibido após a interação",
        input(fieldIds.title, TextInputStyle.Short, 180, true, "Sistema de cargos", response.title),
      ),
      label(
        "Descrição",
        "Markdown e emojis são aceitos",
        input(
          fieldIds.description,
          TextInputStyle.Paragraph,
          2_000,
          true,
          "Veja abaixo todas as informações solicitadas.",
          response.description,
        ),
      ),
      label(
        "Visual e identificação",
        "Tema, cor, autor, rodapé e miniatura",
        input(
          fieldIds.appearance,
          TextInputStyle.Paragraph,
          1_000,
          false,
          "tema: elegant; cor: #9B59FF; autor: Central; rodape: Informação oficial",
          serializeAppearance(response),
        ),
      ),
      label(
        "Seções",
        "Título|Texto|Emoji|sim; separe blocos com >>",
        input(
          fieldIds.sections,
          TextInputStyle.Paragraph,
          2_000,
          false,
          "Como funciona|Participe para evoluir.|⭐|sim >> Benefícios|Acesso especial.|🎁",
          serializeSections(response),
        ),
      ),
      label(
        "Galeria e botões",
        "Use imagem: e botoes:; URLs são obrigatórias nos links",
        input(
          fieldIds.extras,
          TextInputStyle.Paragraph,
          2_000,
          false,
          "imagem: https://site/banner.gif|Banner; botoes: Site|link|https://site|🔗",
          serializeExtras(response),
        ),
      ),
    );
}

export function responseModalToSpec(
  interaction: ModalSubmitInteraction,
  visibility: PanelResponseVisibility,
): PanelResponseSpec {
  const title = interaction.fields.getTextInputValue(fieldIds.title);
  const description = interaction.fields.getTextInputValue(fieldIds.description);
  const appearance = interaction.fields.getTextInputValue(fieldIds.appearance);
  const sections = interaction.fields.getTextInputValue(fieldIds.sections);
  const extras = interaction.fields.getTextInputValue(fieldIds.extras);
  const request = [
    `titulo: ${title}`,
    `descricao: ${description}`,
    appearance,
    sections ? `secoes: ${sections}` : "",
    extras,
  ]
    .filter(Boolean)
    .join("; ");
  const parsed = parsePanelRequest(request);

  return {
    title: parsed.title,
    description: parsed.description,
    color: parsed.color,
    footer: parsed.footer,
    visibility,
    ...(parsed.theme ? { theme: parsed.theme } : {}),
    ...(parsed.author ? { author: parsed.author } : {}),
    ...(parsed.thumbnailUrl ? { thumbnailUrl: parsed.thumbnailUrl } : {}),
    sections: (parsed.sections ?? []).slice(0, 6),
    media: (parsed.media ?? []).slice(0, 10),
    buttons: (parsed.buttons ?? []).slice(0, 5),
  };
}

export function applyResponseDraftMedia(
  response: PanelResponseSpec,
  draft: ResponseDraft,
): PanelResponseSpec {
  const media = draft.banner
    ? [draft.banner, ...(response.media ?? []).filter((item) => item.url !== draft.banner?.url)].slice(0, 10)
    : response.media;
  return {
    ...response,
    ...(media ? { media } : {}),
    ...(draft.thumbnailUrl ? { thumbnailUrl: draft.thumbnailUrl } : {}),
  };
}

function input(
  customId: string,
  style: TextInputStyle,
  maxLength: number,
  required: boolean,
  placeholder: string,
  value: string,
): TextInputBuilder {
  const builder = new TextInputBuilder()
    .setCustomId(customId)
    .setStyle(style)
    .setMaxLength(maxLength)
    .setRequired(required)
    .setPlaceholder(placeholder);
  const safeValue = truncate(value, maxLength);
  if (safeValue) builder.setValue(safeValue);
  return builder;
}

function label(title: string, description: string, textInput: TextInputBuilder): LabelBuilder {
  return new LabelBuilder()
    .setLabel(title)
    .setDescription(description)
    .setTextInputComponent(textInput);
}

function serializeAppearance(response: PanelResponseSpec): string {
  return [
    `tema: ${response.theme ?? "minimal"}`,
    `cor: #${response.color.toString(16).padStart(6, "0").toUpperCase()}`,
    response.author ? `autor: ${response.author}` : "",
    response.footer ? `rodape: ${response.footer}` : "",
    response.thumbnailUrl ? `miniatura: ${response.thumbnailUrl}` : "",
  ]
    .filter(Boolean)
    .join("; ");
}

function serializeSections(response: PanelResponseSpec): string {
  return (response.sections ?? [])
    .map((section) =>
      [
        section.heading,
        section.body.replaceAll("\n", "\\n"),
        section.emoji ?? "",
        section.quote ? "sim" : "nao",
      ].join("|"),
    )
    .join(" >> ");
}

function serializeExtras(response: PanelResponseSpec): string {
  const media = (response.media ?? [])
    .map((item) => [item.url, item.description ?? "", item.spoiler ? "spoiler" : ""].join("|"))
    .join(" >> ");
  const buttons = (response.buttons ?? [])
    .map((button) =>
      [
        button.label,
        button.style,
        button.style === "link" ? button.url ?? "" : button.response ?? "",
        button.emoji ?? "",
      ].join("|"),
    )
    .join(" >> ");
  return [media ? `imagem: ${media}` : "", buttons ? `botoes: ${buttons}` : ""]
    .filter(Boolean)
    .join("; ");
}
