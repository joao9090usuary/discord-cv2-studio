import type {
  CreatePanelInput,
  PanelButtonSpec,
  PanelButtonStyle,
  PanelMediaSpec,
  PanelSectionSpec,
  PanelTheme,
  SelectOptionSpec,
} from "../domain/panel.js";
import {
  neutralizeMentions,
  normalizeKey,
  sanitizeDescription,
  sanitizeTitle,
  slugify,
  truncate,
} from "../lib/text.js";

const DEFAULT_COLOR = 0x5865f2;
const DEFAULT_OPTIONS: SelectOptionSpec[] = [
  {
    label: "Suporte",
    value: "suporte",
    description: "Falar com a equipe de suporte",
    response: "Sua solicitação de suporte foi registrada.",
  },
  {
    label: "Informações",
    value: "informacoes",
    description: "Consultar informações",
    response: "Aqui estão as informações solicitadas.",
  },
];

const fieldAliases: Record<string, string> = {
  titulo: "title",
  title: "title",
  descricao: "description",
  description: "description",
  texto: "description",
  cor: "color",
  color: "color",
  rodape: "footer",
  footer: "footer",
  placeholder: "placeholder",
  opcoes: "options",
  options: "options",
  dropdown: "options",
  animacao: "animation",
  animation: "animation",
  intervalo: "interval",
  interval: "interval",
  tema: "theme",
  theme: "theme",
  autor: "author",
  author: "author",
  secoes: "sections",
  sections: "sections",
  blocos: "sections",
  botoes: "buttons",
  buttons: "buttons",
  banner: "media",
  imagem: "media",
  image: "media",
  imagens: "media",
  galeria: "media",
  miniatura: "thumbnail",
  thumbnail: "thumbnail",
};

export function parsePanelRequest(request: string): CreatePanelInput {
  const fields = parseFields(request);
  const title = sanitizeTitle(fields.title ?? inferTitle(request));
  const description = sanitizeDescription(
    fields.description ?? (fields.title ? "Selecione uma opção abaixo." : request),
  );
  const color = parseColor(fields.color);
  const animationName = (fields.animation ?? "").toLowerCase();
  const animationEnabled = !["", "nao", "não", "off", "false", "nenhuma"].includes(
    animationName,
  );
  const thumbnailUrl = parseUrl(fields.thumbnail);

  return {
    title,
    description,
    color,
    footer: truncate(neutralizeMentions(fields.footer ?? "Use o menu para continuar"), 300),
    placeholder: truncate(fields.placeholder ?? "Escolha uma opção", 150),
    options: fields.options ? parseOptions(fields.options) : structuredClone(DEFAULT_OPTIONS),
    theme: parseTheme(fields.theme),
    ...(fields.author ? { author: truncate(neutralizeMentions(fields.author), 100) } : {}),
    ...(thumbnailUrl ? { thumbnailUrl } : {}),
    sections: fields.sections ? parseSections(fields.sections) : [],
    media: fields.media ? parseMedia(fields.media) : [],
    buttons: fields.buttons ? parseButtons(fields.buttons) : [],
    animation: {
      enabled: animationEnabled,
      intervalMs: parseInterval(fields.interval),
      frames: buildFrames(color, animationName),
    },
  };
}

function parseTheme(value?: string): PanelTheme {
  const normalized = normalizeKey(value ?? "");
  if (["elegante", "elegant", "luxo", "ornate"].includes(normalized)) return "elegant";
  if (["fofo", "fofa", "cute", "rosa", "kawaii"].includes(normalized)) return "cute";
  if (["game", "gaming", "gamer", "jogo"].includes(normalized)) return "gaming";
  if (["regras", "rules", "moderacao", "avisos"].includes(normalized)) return "rules";
  return "minimal";
}

function parseFields(request: string): Record<string, string> {
  const result: Record<string, string> = {};
  const matcher = /(^|[;\r\n]|\s)([\p{L}]+)\s*:/gu;
  const matches = [...request.matchAll(matcher)]
    .map((match) => ({
      index: match.index,
      valueStart: match.index + match[0].length,
      key: fieldAliases[normalizeKey(match[2] ?? "")],
    }))
    .filter((match): match is typeof match & { key: string } => Boolean(match.key));

  for (const [index, match] of matches.entries()) {
    const next = matches[index + 1];
    const value = request
      .slice(match.valueStart, next?.index ?? request.length)
      .replace(/[;\s]+$/u, "")
      .trim();
    if (value) result[match.key] = value;
  }
  return result;
}

function inferTitle(request: string): string {
  const firstLine = request.split(/[\r\n;]/, 1)[0]?.trim() ?? "Novo painel";
  return firstLine.length <= 80 ? firstLine : "Painel interativo";
}

export function parseColor(value?: string): number {
  if (!value) return DEFAULT_COLOR;
  const normalized = value.trim().replace(/^#/, "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return DEFAULT_COLOR;
  return Number.parseInt(normalized, 16);
}

function parseInterval(value?: string): number {
  if (!value) return 4_000;
  const match = value.toLowerCase().match(/([\d.,]+)\s*(ms|s|seg|segundos?)?/);
  if (!match?.[1]) return 4_000;
  const amount = Number.parseFloat(match[1].replace(",", "."));
  const milliseconds = match[2] === "ms" ? amount : amount * 1_000;
  return Math.max(2_500, Math.min(60_000, Math.round(milliseconds)));
}

function parseOptions(value: string): SelectOptionSpec[] {
  if (["nenhuma", "nenhum", "none", "off"].includes(normalizeKey(value))) return [];
  const chunks = value
    .split(/\s*(?:>>|,|\n)\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 25);

  const options = chunks.map((chunk, index) => {
    const [rawLabel, rawValue, rawResponse, rawDescription, rawEmoji] = chunk
      .split("|")
      .map((part) => part.trim());
    const label = truncate(rawLabel || `Opção ${index + 1}`, 100);
    const optionValue = truncate(rawValue || slugify(label), 100);
    const response = truncate(
      neutralizeMentions((rawResponse || `Você selecionou **${label}**.`).replaceAll("\\n", "\n")),
      1_500,
    );
    const description = rawDescription ? truncate(rawDescription, 100) : undefined;
    const emoji = rawEmoji ? truncate(rawEmoji, 40) : undefined;
    return {
      label,
      value: optionValue,
      response,
      ...(description ? { description } : {}),
      ...(emoji ? { emoji } : {}),
    };
  });

  return options.length > 0 ? options : structuredClone(DEFAULT_OPTIONS);
}

function parseSections(value: string): PanelSectionSpec[] {
  return value
    .split(/\s*(?:>>|\n)\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 8)
    .map((item, index) => {
      const [rawHeading, rawBody, rawEmoji, rawQuote] = item
        .split("|")
        .map((part) => part.trim());
      const heading = truncate(neutralizeMentions(rawHeading || `Seção ${index + 1}`), 120);
      const body = truncate(
        neutralizeMentions((rawBody || "Conteúdo da seção.").replaceAll("\\n", "\n")),
        1_500,
      );
      const emoji = rawEmoji ? truncate(rawEmoji, 40) : undefined;
      const quote = rawQuote ? ["sim", "yes", "true", "quote"].includes(rawQuote.toLowerCase()) : undefined;
      return {
        heading,
        body,
        ...(emoji ? { emoji } : {}),
        ...(quote !== undefined ? { quote } : {}),
      };
    });
}

function parseMedia(value: string): PanelMediaSpec[] {
  return value
    .split(/\s*(?:>>|,|\n)\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 10)
    .flatMap<PanelMediaSpec>((item): PanelMediaSpec[] => {
      const [rawUrl, rawDescription, rawSpoiler] = item.split("|").map((part) => part.trim());
      const url = parseUrl(rawUrl);
      if (!url) return [];
      const description = rawDescription ? truncate(rawDescription, 1_024) : undefined;
      return [{
        url,
        ...(description ? { description } : {}),
        ...(rawSpoiler === "spoiler" ? { spoiler: true } : {}),
      }];
    });
}

function parseButtons(value: string): PanelButtonSpec[] {
  return value
    .split(/\s*(?:>>|\n)\s*/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 5)
    .flatMap<PanelButtonSpec>((item): PanelButtonSpec[] => {
      const [rawLabel, rawStyle, rawAction, rawEmoji] = item.split("|").map((part) => part.trim());
      const label = truncate(rawLabel || "Ação", 80);
      const style = parseButtonStyle(rawStyle);
      const emoji = rawEmoji ? truncate(rawEmoji, 40) : undefined;
      if (style === "link") {
        const url = parseUrl(rawAction);
        if (!url) return [];
        return [{ label, style, url, ...(emoji ? { emoji } : {}) }];
      }
      const response = truncate(
        neutralizeMentions(rawAction || `Você acionou **${label}**.`),
        1_500,
      );
      return [{ label, style, response, ...(emoji ? { emoji } : {}) }];
    });
}

function parseButtonStyle(value?: string): PanelButtonStyle {
  const normalized = normalizeKey(value ?? "");
  if (["primary", "primario", "azul"].includes(normalized)) return "primary";
  if (["success", "sucesso", "verde"].includes(normalized)) return "success";
  if (["danger", "perigo", "vermelho"].includes(normalized)) return "danger";
  if (["link", "url"].includes(normalized)) return "link";
  return "secondary";
}

function parseUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function buildFrames(baseColor: number, name: string) {
  if (name.includes("rainbow") || name.includes("arco")) {
    return [
      { color: 0xed4245, marker: "🔴" },
      { color: 0xfee75c, marker: "🟡" },
      { color: 0x57f287, marker: "🟢" },
      { color: 0x5865f2, marker: "🔵" },
      { color: 0xeb459e, marker: "🟣" },
    ];
  }

  return [
    { color: baseColor, marker: "◆" },
    { color: mixColors(baseColor, 0xffffff, 0.62), marker: "◇" },
    { color: baseColor, marker: "◆" },
    { color: mixColors(baseColor, 0x000000, 0.38), marker: "·" },
  ];
}

function mixColors(color: number, target: number, amount: number): number {
  const channel = (shift: number) => {
    const sourceChannel = (color >> shift) & 0xff;
    const targetChannel = (target >> shift) & 0xff;
    return Math.round(sourceChannel + (targetChannel - sourceChannel) * amount);
  };
  const red = channel(16);
  const green = channel(8);
  const blue = channel(0);
  return (red << 16) | (green << 8) | blue;
}
