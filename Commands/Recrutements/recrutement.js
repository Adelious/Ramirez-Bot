const { EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("recrutement").setDescription("Création de l'embed de recrutement").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    let embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setTitle("Candidature")
      .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
      .setDescription("Ouverture de candidature")
      .setTimestamp()
      .setFooter({
        text: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      });

    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("candidature")
        .setLabel("Candidater")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("📩")
    );

    await interaction.reply({ embeds: [embed], components: [button]});
  },
};