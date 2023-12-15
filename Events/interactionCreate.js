const Discord = require("discord.js");
const {
  recrutementCategoryID,
  recrutementArchiveCategoryID,
  recrutementStaffArchiveCategoryID,
  recrutementLogChannelID,
} = require("../config.json");

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

    if (interaction.isButton()) {
      // Ticket de recrutement

      if (interaction.customId === "candidature") {
        let channel = await interaction.guild.channels.create({
          name: `candidature-${
            interaction.member.nickname !== null
              ? interaction.member.nickname.replace(" ", "-")
              : interaction.user.username
          }`,
          type: Discord.ChannelType.GuildText,
        });

        await channel.setParent(recrutementCategoryID);

        await channel.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          EmbedLinks: true,
          SendMessages: true,
          ReadMessageHistory: true,
          AttachFiles: true,
        });

        await channel.permissionOverwrites.create(
          interaction.guild.roles.everyone.id,
          {
            ViewChannel: false,
          }
        );

        await interaction.reply({
          content: `Votre candidature a correctement été créée : ${channel}`,
          ephemeral: true,
        });

        await channel.setTopic(interaction.user.id);
        
        let embed = new Discord.EmbedBuilder()
          .setColor(Discord.Colors.Blue)
          .setTitle("Candidature")
          .setThumbnail(
            interaction.client.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription("Ouverture d'une candidature")
          .setTimestamp()
          .setFooter({
            text: interaction.client.user.username,
            iconURL: interaction.client.user.displayAvatarURL({
              dynamic: true,
            }),
          });

        const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("close-recrutement")
            .setLabel("fermer la candidature")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️")
        );

        await channel.send({ embeds: [embed], components: [button] });

        channel.send(
          "## ✏╏modèle-candidature\n\n* **Pseudo** In Game :\n* **Âge** :\n* **Motivations** : *10 lignes minimum*\n* **Pourquoi vous et pas un autre** : *10 lignes minimum*\n* **Que représente la Ramirez pour vous** :\n* **Nombre d'heure de jeu sur le serveur** ( *screenshot* ) :\n* **Sanctions sur le serveur** ( *screenshot* ) :\n* **Informations supplémentaires** ( *facultatives* ) :\n\nEn cas de soucis avec ce formulaire, veuillez contacter la modération. Tout abus sera sévèrement sanctionné."
        );
      }

      // Close recrutement

      if (interaction.customId === "close-recrutement") {
        let user = interaction.client.users.cache.get(
          interaction.channel.topic
        );
        try {
          await user.send("Votre candidature bien a été fermée.");
          await interaction.reply({
            content: "Le candidature a été fermée.",
            ephemeral: true,
          });
        } catch (error) {
          console.log(error);
        }

        await interaction.channel.setParent(recrutementArchiveCategoryID);

        await interaction.channel.permissionOverwrites.create(
          interaction.user.id,
          {
            ViewChannel: false,
          }
        );
      }

      // Ticket de recrutement staff

      if (
        interaction.customId === "btn-economie" ||
        interaction.customId === "btn-judiciaire" ||
        interaction.customId === "btn-mod" ||
        interaction.customId === "btn-communication"
      ) {
        let channel = await interaction.guild.channels.create({
          name: `candidature-staff-${
            interaction.member.nickname !== null
              ? interaction.member.nickname.replace(" ", "-")
              : interaction.user.username
          }`,
          type: Discord.ChannelType.GuildText,
        });

        await channel.setParent(recrutementCategoryID);

        await channel.permissionOverwrites.create(interaction.user.id, {
          ViewChannel: true,
          EmbedLinks: true,
          SendMessages: true,
          ReadMessageHistory: true,
          AttachFiles: true,
        });

        await channel.permissionOverwrites.create(
          interaction.guild.roles.everyone.id,
          {
            ViewChannel: false,
          }
        );

        await interaction.reply({
          content: `Votre candidature a correctement été créée : ${channel}`,
          ephemeral: true,
        });

        await channel.setTopic(interaction.user.id);

        let embed = new Discord.EmbedBuilder()
          .setColor(Discord.Colors.Blue)
          .setTitle("Candidature")
          .setThumbnail(
            interaction.client.user.displayAvatarURL({ dynamic: true })
          )
          .setDescription("Ouverture d'une candidature satff")
          .setTimestamp()
          .setFooter({
            text: interaction.client.user.username,
            iconURL: interaction.client.user.displayAvatarURL({
              dynamic: true,
            }),
          });

        const button = new Discord.ActionRowBuilder().addComponents(
          new Discord.ButtonBuilder()
            .setCustomId("close-recrutement-staff")
            .setLabel("fermer la candidature")
            .setStyle(Discord.ButtonStyle.Danger)
            .setEmoji("🗑️")
        );

        await channel.send({ embeds: [embed], components: [button] });

        channel.send(
          "## Formulaire pour devenir membre staff\n\n* **Poste souhaité** :\n* **Prénom** :\n* **Âge** :\n* **Expérience** :\n* **Motivation** :\n* **Disponibilités** :\n* **Autre** ( *facultatif*) :"
        );
      }

      // fermeture ticket staff

      if (interaction.customId === "close-recrutement-staff") {
        let user = interaction.client.users.cache.get(
          interaction.channel.topic
        );
        try {
          await user.send("Votre candidature bien a été fermée.");
          await interaction.reply({
            content: "Le candidature a été fermée.",
            ephemeral: true,
          });
        } catch (error) {
          console.log(error);
        }

        await interaction.channel.setParent(recrutementStaffArchiveCategoryID);

        await interaction.channel.permissionOverwrites.create(
          interaction.user.id,
          {
            ViewChannel: false,
          }
        );
      }
    }
  },
};
