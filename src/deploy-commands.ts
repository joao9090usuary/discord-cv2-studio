import { REST, Routes } from "discord.js";
import { commandsJson } from "./commands.js";
import { config } from "./config.js";

const rest = new REST().setToken(config.token);
const route = config.guildId
  ? Routes.applicationGuildCommands(config.clientId, config.guildId)
  : Routes.applicationCommands(config.clientId);

await rest.put(route, { body: commandsJson });
console.log(
  `${commandsJson.length} comandos registrados ${
    config.guildId ? `no servidor ${config.guildId}` : "globalmente"
  }.`,
);
