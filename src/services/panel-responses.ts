import type {
  PanelButtonSpec,
  PanelResponseSpec,
  PanelSpec,
  SelectOptionSpec,
} from "../domain/panel.js";
import { normalizeKey } from "../lib/text.js";

export type ResponseTargetKind = "option" | "button";

export interface ResponseTarget {
  kind: ResponseTargetKind;
  index: number;
}

export function findResponseTarget(
  panel: PanelSpec,
  kind: ResponseTargetKind,
  identifier: string,
): ResponseTarget | undefined {
  const clean = identifier.trim();
  const normalized = normalizeKey(clean);

  if (kind === "option") {
    const index = panel.options.findIndex(
      (option) => option.value === clean || normalizeKey(option.label) === normalized,
    );
    return index >= 0 ? { kind, index } : undefined;
  }

  const numericIndex = Number.parseInt(clean, 10);
  if (Number.isInteger(numericIndex) && numericIndex >= 1 && numericIndex <= (panel.buttons?.length ?? 0)) {
    return { kind, index: numericIndex - 1 };
  }

  const index = (panel.buttons ?? []).findIndex(
    (button) => normalizeKey(button.label) === normalized,
  );
  return index >= 0 ? { kind, index } : undefined;
}

export function getResponseTargetItem(
  panel: PanelSpec,
  target: ResponseTarget,
): SelectOptionSpec | PanelButtonSpec | undefined {
  return target.kind === "option"
    ? panel.options[target.index]
    : panel.buttons?.[target.index];
}

export function resolveResponsePanel(
  panel: PanelSpec,
  target: ResponseTarget,
): PanelResponseSpec {
  const item = getResponseTargetItem(panel, target);
  if (!item) return unavailableResponse(panel);
  if (item.responsePanel) return item.responsePanel;

  const description = item.response || `Você acionou **${item.label}**.`;
  return {
    title: `${item.emoji ? `${item.emoji} ` : ""}${item.label}`,
    description,
    color: panel.color,
    footer: panel.footer,
    visibility: "private",
    ...(panel.theme ? { theme: panel.theme } : {}),
  };
}

export function assignResponsePanel(
  panel: PanelSpec,
  target: ResponseTarget,
  responsePanel: PanelResponseSpec,
): PanelSpec {
  if (target.kind === "option") {
    const options = panel.options.map((option, index) =>
      index === target.index
        ? { ...option, responsePanel }
        : option,
    );
    return { ...panel, options };
  }

  const buttons = (panel.buttons ?? []).map((button, index) =>
    index === target.index
      ? { ...button, responsePanel }
      : button,
  );
  return { ...panel, buttons };
}

export function removeResponsePanel(panel: PanelSpec, target: ResponseTarget): PanelSpec {
  if (target.kind === "option") {
    const options = panel.options.map((option, index) => {
      if (index !== target.index) return option;
      const { responsePanel: _responsePanel, ...legacyOption } = option;
      return legacyOption;
    });
    return { ...panel, options };
  }

  const buttons = (panel.buttons ?? []).map((button, index) => {
    if (index !== target.index) return button;
    const { responsePanel: _responsePanel, ...legacyButton } = button;
    return legacyButton;
  });
  return { ...panel, buttons };
}

export function responseTargetLabel(panel: PanelSpec, target: ResponseTarget): string {
  return getResponseTargetItem(panel, target)?.label ?? "Ação indisponível";
}

function unavailableResponse(panel: PanelSpec): PanelResponseSpec {
  return {
    title: "Ação indisponível",
    description: "Esta opção não está mais disponível.",
    color: panel.color,
    footer: panel.footer,
    visibility: "private",
    ...(panel.theme ? { theme: panel.theme } : {}),
  };
}
