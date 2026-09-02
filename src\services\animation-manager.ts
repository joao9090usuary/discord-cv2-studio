import { MessageFlags, type Client } from "discord.js";
import type { PanelSpec } from "../domain/panel.js";
import { renderPanel } from "./panel-renderer.js";
import type { PanelStore } from "./panel-store.js";

export class AnimationManager {
  readonly #timers = new Map<string, NodeJS.Timeout>();

  public constructor(
    private readonly client: Client,
    private readonly store: PanelStore,
  ) {}

  public start(panel: PanelSpec): void {
    this.stop(panel.id);
    if (!panel.animation.enabled || !panel.messageId) return;

    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      void this.#renderFrame(panel.id, frame);
    }, panel.animation.intervalMs);
    timer.unref();
    this.#timers.set(panel.id, timer);
    console.log(
      `[animation:${panel.id}] ativa (${panel.animation.frames.length} frames, ${panel.animation.intervalMs}ms)`,
    );
  }

  public stop(panelId: string): void {
    const timer = this.#timers.get(panelId);
    if (timer) clearInterval(timer);
    this.#timers.delete(panelId);
    if (timer) console.log(`[animation:${panelId}] pausada`);
  }

  public restoreAll(): void {
    for (const panel of this.store.list()) this.start(panel);
  }

  async #renderFrame(panelId: string, frame: number): Promise<void> {
    const panel = this.store.get(panelId);
    if (!panel?.messageId || !panel.animation.enabled) {
      this.stop(panelId);
      return;
    }

    try {
      const channel = await this.client.channels.fetch(panel.channelId);
      if (!channel?.isTextBased() || channel.isDMBased()) return;
      const message = await channel.messages.fetch(panel.messageId);
      await message.edit({
        components: renderPanel(panel, frame),
        flags: MessageFlags.IsComponentsV2,
      });
    } catch (error) {
      console.error(`[animation:${panel.id}] frame não aplicado`, error);
    }
  }
}
