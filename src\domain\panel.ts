export interface SelectOptionSpec {
  label: string;
  value: string;
  description?: string;
  response: string;
  emoji?: string;
  responsePanel?: PanelResponseSpec;
}

export interface AnimationFrame {
  color: number;
  marker: string;
}

export interface AnimationSpec {
  enabled: boolean;
  intervalMs: number;
  frames: AnimationFrame[];
}

export type PanelTheme = "minimal" | "elegant" | "cute" | "gaming" | "rules";

export interface PanelSectionSpec {
  heading: string;
  body: string;
  emoji?: string;
  quote?: boolean;
}

export interface PanelMediaSpec {
  url: string;
  description?: string;
  spoiler?: boolean;
}

export type PanelButtonStyle = "primary" | "secondary" | "success" | "danger" | "link";

export interface PanelButtonSpec {
  label: string;
  style: PanelButtonStyle;
  response?: string;
  url?: string;
  emoji?: string;
  responsePanel?: PanelResponseSpec;
}

export type PanelResponseVisibility = "private" | "public";

/**
 * Painel Components V2 exibido como resultado de um dropdown ou botão.
 * A propriedade é opcional nas ações para manter compatibilidade com os
 * arquivos JSON criados antes do editor de respostas avançadas.
 */
export interface PanelResponseSpec {
  title: string;
  description: string;
  color: number;
  footer: string;
  visibility: PanelResponseVisibility;
  theme?: PanelTheme;
  author?: string;
  thumbnailUrl?: string;
  sections?: PanelSectionSpec[];
  media?: PanelMediaSpec[];
  buttons?: PanelButtonSpec[];
}

export interface PanelSpec {
  id: string;
  ownerId: string;
  guildId: string;
  channelId: string;
  messageId?: string;
  title: string;
  description: string;
  color: number;
  footer: string;
  placeholder: string;
  options: SelectOptionSpec[];
  animation: AnimationSpec;
  theme?: PanelTheme;
  author?: string;
  thumbnailUrl?: string;
  sections?: PanelSectionSpec[];
  media?: PanelMediaSpec[];
  buttons?: PanelButtonSpec[];
  createdAt: string;
}

export type CreatePanelInput = Omit<
  PanelSpec,
  "id" | "ownerId" | "guildId" | "channelId" | "messageId" | "createdAt"
>;
