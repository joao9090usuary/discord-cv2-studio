import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { PanelSpec } from "../domain/panel.js";

export class PanelStore {
  readonly #panels = new Map<string, PanelSpec>();
  #writeQueue = Promise.resolve();

  public constructor(private readonly filePath: string) {}

  public async load(): Promise<void> {
    try {
      const raw = await readFile(this.filePath, "utf8");
      const panels = JSON.parse(raw) as PanelSpec[];
      for (const panel of panels) this.#panels.set(panel.id, panel);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }

  public get(id: string): PanelSpec | undefined {
    return this.#panels.get(id);
  }

  public list(): PanelSpec[] {
    return [...this.#panels.values()];
  }

  public async save(panel: PanelSpec): Promise<void> {
    this.#panels.set(panel.id, panel);
    await this.#persist();
  }

  public async update(id: string, patch: Partial<PanelSpec>): Promise<PanelSpec | undefined> {
    const current = this.#panels.get(id);
    if (!current) return undefined;
    const updated = { ...current, ...patch };
    this.#panels.set(id, updated);
    await this.#persist();
    return updated;
  }

  #persist(): Promise<void> {
    this.#writeQueue = this.#writeQueue.then(async () => {
      await mkdir(dirname(this.filePath), { recursive: true });
      const temporaryPath = `${this.filePath}.tmp`;
      const json = JSON.stringify(this.list(), null, 2);
      await writeFile(temporaryPath, json, "utf8");
      await rename(temporaryPath, this.filePath);
    });
    return this.#writeQueue;
  }
}
