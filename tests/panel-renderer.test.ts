import assert from "node:assert/strict";
import test from "node:test";
import { ComponentType } from "discord.js";
import type { PanelSpec } from "../src/domain/panel.js";
import { renderPanel, renderSelectionResponse } from "../src/services/panel-renderer.js";
import { getPanelTemplate, templateChoices } from "../src/services/panel-templates.js";
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
