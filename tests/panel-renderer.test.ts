import assert from "node:assert/strict";
import test from "node:test";
import { ComponentType } from "discord.js";
import type { PanelResponseSpec, PanelSpec } from "../src/domain/panel.js";
import {
  renderPanel,
  renderResponseActionResult,
  renderSelectionResponse,
} from "../src/services/panel-renderer.js";
import {
  assignResponsePanel,
  findResponseTarget,
  removeResponsePanel,
  resolveResponsePanel,
} from "../src/services/panel-responses.js";
import { getPanelTemplate, templateChoices } from "../src/services/panel-templates.js";
import { buildResponseStudioModal } from "../src/services/response-studio.js";
import { buildStudioModal } from "../src/services/studio-modal.js";

const panel: PanelSpec = {
  id: "abc123",
  ownerId: "1",
  guildId: "2",
  channelId: "3",
  title: "Atendimento",
  description: "Escolha um setor.",
  color: 0x5865f2,
  footer: "Equipe online",
  placeholder: "Selecione",
  options: [
    {
      label: "Suporte",
      value: "suporte",
      description: "Ajuda técnica",
      response: "Atendimento iniciado.",
    },
  ],
  animation: {
    enabled: true,
    intervalMs: 4_000,
    frames: [
      { color: 0x5865f2, marker: "◆" },
      { color: 0x7289da, marker: "◇" },
    ],
  },
  createdAt: "2026-09-01T00:00:00.000Z",
};

test("serializa um Container CV2 com dropdown", () => {
  const [container] = renderPanel(panel);
  assert.ok(container);
  const json = container.toJSON();

  assert.equal(json.type, ComponentType.Container);
  const row = json.components.find((component) => component.type === ComponentType.ActionRow);
  assert.ok(row && "components" in row);
  assert.equal(row.components[0]?.type, ComponentType.StringSelect);
  assert.equal(row.components[0]?.custom_id, "cv2-panel:abc123");
});

test("serializa a resposta privada da opção selecionada", () => {
  const [container] = renderSelectionResponse(panel, "suporte");
  assert.ok(container);
  const json = container.toJSON();
  assert.equal(json.type, ComponentType.Container);
  assert.match(JSON.stringify(json), /Atendimento iniciado/);
});

test("serializa uma resposta CV2 completa com mídia e ações", () => {
  const responsePanel: PanelResponseSpec = {
    title: "Central de suporte",
    description: "Escolha como deseja continuar.",
    color: 0x9b59ff,
    footer: "Atendimento oficial",
    visibility: "public",
    theme: "elegant",
    author: "Equipe de suporte",
    thumbnailUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
    sections: [
      { heading: "Horários", body: "Todos os dias, das 9h às 22h.", emoji: "🕘", quote: true },
      { heading: "Prioridade", body: "Informe todos os detalhes.", emoji: "✨" },
    ],
    media: [{ url: "https://cdn.discordapp.com/embed/avatars/1.png", description: "Banner" }],
    buttons: [
      { label: "Confirmar", style: "success", response: "Solicitação confirmada.", emoji: "✅" },
      { label: "Documentação", style: "link", url: "https://example.com", emoji: "🔗" },
    ],
  };
  const richPanel = assignResponsePanel(panel, { kind: "option", index: 0 }, responsePanel);
  const [container] = renderSelectionResponse(richPanel, "suporte");
  assert.ok(container);
  const json = container.toJSON();
  const serialized = JSON.stringify(json);

  assert.equal(json.type, ComponentType.Container);
  assert.equal(json.accent_color, 0x9b59ff);
  assert.match(serialized, /Central de suporte/);
  assert.match(serialized, /Horários/);
  assert.match(serialized, /cv2-ract:abc123:o:0:0/);
  assert.match(serialized, /https:\/\/example.com/);
  assert.ok(countComponents(json) <= 40);
});

test("localiza, atribui e remove respostas avançadas sem quebrar o fallback", () => {
  const target = findResponseTarget(panel, "option", "Suporte");
  assert.deepEqual(target, { kind: "option", index: 0 });
  assert.deepEqual(findResponseTarget({ ...panel, buttons: [{ label: "Abrir", style: "primary", response: "Ok" }] }, "button", "1"), {
    kind: "button",
    index: 0,
  });

  const configured = assignResponsePanel(panel, target!, {
    title: "Resposta personalizada",
    description: "Conteúdo completo.",
    color: 0x123456,
    footer: "Rodapé",
    visibility: "private",
  });
  assert.equal(resolveResponsePanel(configured, target!).title, "Resposta personalizada");

  const restored = removeResponsePanel(configured, target!);
  assert.equal(restored.options[0]?.responsePanel, undefined);
  assert.equal(resolveResponsePanel(restored, target!).description, "Atendimento iniciado.");
});

test("serializa o resultado de uma ação interna da resposta", () => {
  const response = resolveResponsePanel(panel, { kind: "option", index: 0 });
  const [container] = renderResponseActionResult(panel, response, {
    label: "Confirmar",
    style: "success",
    response: "Tudo certo!",
    emoji: "✅",
  });
  assert.match(JSON.stringify(container?.toJSON()), /Tudo certo/);
});

test("serializa todos os modelos profissionais", () => {
  for (const choice of templateChoices) {
    const input = getPanelTemplate(choice.value);
    assert.ok(input, `modelo ${choice.value} deve existir`);
    const richPanel: PanelSpec = {
      ...panel,
      ...input,
      id: choice.value,
      thumbnailUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
      media: [{ url: "https://cdn.discordapp.com/embed/avatars/1.png" }],
    };
    const [container] = renderPanel(richPanel);
    assert.ok(container);
    const json = container.toJSON();
    assert.equal(json.type, ComponentType.Container);
    assert.ok(countComponents(json) <= 40, "payload deve respeitar o limite de 40 componentes");
  }
});

function countComponents(value: unknown): number {
  if (!value || typeof value !== "object") return 0;
  const object = value as { type?: unknown; components?: unknown[] };
  const own = typeof object.type === "number" ? 1 : 0;
  return own + (object.components ?? []).reduce<number>(
    (total, child) => total + countComponents(child),
    0,
  );
}

test("serializa o formulário guiado do Studio", () => {
  const modal = buildStudioModal().toJSON();
  assert.equal(modal.custom_id, "cv2-studio-create");
  assert.equal(modal.components.length, 5);
});

test("serializa o editor de respostas completas", () => {
  const response = resolveResponsePanel(panel, { kind: "option", index: 0 });
  const modal = buildResponseStudioModal("draft123", response).toJSON();
  assert.equal(modal.custom_id, "cv2-response-config:draft123");
  assert.equal(modal.components.length, 5);
});
