const Discord = require("discord.js");
const { commandeCategoryID, commandeArchiveCategoryID, recrutementArchiveCategoryID, recrutementCategoryID, joueurRoleID } = require("../../config.json");
const sqlite3 = require("sqlite3");
const dbname = "main.sqlite";

module.exports = {
  name: Discord.Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing /${interaction.commandName}`);
        console.error(error);
      }
    }
  },
};