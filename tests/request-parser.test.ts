import assert from "node:assert/strict";
import test from "node:test";
import { parseColor, parsePanelRequest } from "../src/services/request-parser.js";

test("interpreta um pedido completo em português", () => {
  const panel = parsePanelRequest(
    "titulo: Loja; descrição: Escolha um produto; cor: #ff0066; " +
      "opções: Plano A|a|Você escolheu A|Entrada, Plano B|b|Você escolheu B|Premium; " +
      "animação: rainbow; intervalo: 1s",
  );

  assert.equal(panel.title, "Loja");
  assert.equal(panel.description, "Escolha um produto");
  assert.equal(panel.color, 0xff0066);
  assert.equal(panel.options.length, 2);
  assert.equal(panel.options[1]?.value, "b");
  assert.equal(panel.animation.frames.length, 5);
  assert.equal(panel.animation.intervalMs, 2_500);
});

test("usa padrões seguros em um pedido livre", () => {
  const panel = parsePanelRequest("Quero uma central de suporte elegante");
  assert.equal(panel.title, "Quero uma central de suporte elegante");
  assert.equal(panel.options.length, 2);
  assert.equal(panel.animation.enabled, false);
});

test("reconhece campos inline mesmo sem ponto e vírgula", () => {
  const panel = parsePanelRequest(
    "titulo: Comunidade descricao: Bem-vindo! cor: #12AB34 animacao: pulse intervalo: 3s",
  );

  assert.equal(panel.title, "Comunidade");
  assert.equal(panel.description, "Bem-vindo!");
  assert.equal(panel.color, 0x12ab34);
  assert.equal(panel.animation.enabled, true);
  assert.equal(panel.animation.frames.length, 4);
  assert.notEqual(panel.animation.frames[0]?.color, panel.animation.frames[1]?.color);
});

test("valida cores hexadecimais", () => {
  assert.equal(parseColor("#00ff7f"), 0x00ff7f);
  assert.equal(parseColor("invalida"), 0x5865f2);
});

test("interpreta temas, seções, mídia e botões avançados", () => {
  const panel = parsePanelRequest(
    "tema: cute; autor: Staff; titulo: Clube; descricao: Bem-vindo; " +
      "secoes: Regras|Seja gentil.|💗|sim >> Benefícios|Cores especiais.|🎀; " +
      "imagem: https://example.com/banner.png|Banner principal; " +
      "miniatura: https://example.com/icon.png; " +
      "botoes: Confirmar|success|Confirmado!|✅ >> Site|link|https://example.com|🔗",
  );

  assert.equal(panel.theme, "cute");
  assert.equal(panel.author, "Staff");
  assert.equal(panel.sections?.length, 2);
  assert.equal(panel.media?.[0]?.url, "https://example.com/banner.png");
  assert.equal(panel.thumbnailUrl, "https://example.com/icon.png");
  assert.equal(panel.buttons?.[0]?.style, "success");
  assert.equal(panel.buttons?.[1]?.style, "link");
});
