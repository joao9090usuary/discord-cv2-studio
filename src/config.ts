import "dotenv/config";
import { resolve } from "node:path";
import { z } from "zod";

const environmentSchema = z.object({
  DISCORD_TOKEN: z.string().min(1, "DISCORD_TOKEN não foi definido"),
  DISCORD_CLIENT_ID: z.string().min(1, "DISCORD_CLIENT_ID não foi definido"),
  DISCORD_GUILD_ID: z.string().optional(),
  DATA_FILE: z.string().default("./data/panels.json"),
});

const parsed = environmentSchema.safeParse(process.env);
if (!parsed.success) {
  const messages = parsed.error.issues.map((issue) => `- ${issue.message}`).join("\n");
  throw new Error(`Configuração inválida:\n${messages}\nCopie .env.example para .env.`);
}

export const config = {
  token: parsed.data.DISCORD_TOKEN,
  clientId: parsed.data.DISCORD_CLIENT_ID,
  guildId: parsed.data.DISCORD_GUILD_ID,
  dataFile: resolve(parsed.data.DATA_FILE),
};
