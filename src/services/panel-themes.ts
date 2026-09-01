import type { PanelTheme } from "../domain/panel.js";

export interface ThemeTokens {
  titlePrefix: string;
  topDecoration: string;
  bottomDecoration: string;
  sectionBullet: string;
  quoteSections: boolean;
}

const themes: Record<PanelTheme, ThemeTokens> = {
  minimal: {
    titlePrefix: "",
    topDecoration: "",
    bottomDecoration: "",
    sectionBullet: "•",
    quoteSections: false,
  },
  elegant: {
    titlePrefix: "✦",
    topDecoration: "╭─── ୨୧ ───────── ୨୧ ───╮",
    bottomDecoration: "╰─── ୨୧ ───────── ୨୧ ───╯",
    sectionBullet: "⌁",
    quoteSections: true,
  },
  cute: {
    titlePrefix: "♡",
    topDecoration: "୨୧ ──・┈・୨୧・┈・── ୨୧",
    bottomDecoration: "₊˚⊹♡ ───────── ♡⊹˚₊",
    sectionBullet: "୨୧",
    quoteSections: false,
  },
  gaming: {
    titlePrefix: "🎮",
    topDecoration: "╔═══════〔 PLAYER HUB 〕═══════╗",
    bottomDecoration: "╚══════════════════════════════╝",
    sectionBullet: "▸",
    quoteSections: true,
  },
  rules: {
    titlePrefix: "⚖",
    topDecoration: "┌───── ⚖ ─────┐",
    bottomDecoration: "└───── 📜 ─────┘",
    sectionBullet: "▌",
    quoteSections: true,
  },
};

export function getTheme(theme?: PanelTheme): ThemeTokens {
  return themes[theme ?? "minimal"];
}

export function quoteMarkdown(value: string): string {
  return value
    .split("\n")
    .map((line) => `> ${line || " "}`)
    .join("\n");
}
