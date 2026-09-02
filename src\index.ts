import { createBot } from "./bot.js";
import { config } from "./config.js";
import { PanelStore } from "./services/panel-store.js";

const store = new PanelStore(config.dataFile);
await store.load();

const client = createBot(store);

const shutdown = async (signal: string) => {
  console.log(`Recebido ${signal}; encerrando...`);
  client.destroy();
  process.exit(0);
};

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

await client.login(config.token);
