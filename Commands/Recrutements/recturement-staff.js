const { EmbedBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("staff-recrutement").setDescription("Création de l'embed de recrutement de staff").setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    let embed = new EmbedBuilder()
      .setColor(Colors.Purple)
      .setTitle("Candidature")
      .setThumbnail(interaction.client.user.displayAvatarURL({ dynamic: true }))
      .setDescription("Ouverture de candidature staff")
      .setFields([
        { name: "Informations pratiques",
          value: "* <@&1159268311654215832> et <@&1159268426984992898> vous pouvez rejoindre une filière des que vous avez atteint le **niveau 20**. Voici les différentes filières ci-dessous pour participer à la gestion de l'organisation : Chaque filière est composer de 5 membre dont un Référant, élu en interne.\n",
        },
        { name: "Économie",
          value: "* <@&1159492942617116742> : elle est responsable des rentrées et sorties d’argent du coffre de l’organisation. Elle alimente le coffre en armes, plantes et autres avec les bénéfices effectués par l’organisation pour faire fonctionner le marché noir. Elle se réunion en commission pour voter les budget du mois.",
        },
        { name: "Judiciaire",
          value: "* <@&1159492953178386604> :   Elle est la plus haute autorité après le <@&1107562203382554655> sur l’application des sanctions. Il régule l’organisation et fait son possible pour éviter qu’un membre soit warn.  Elle est également chargé de recruter de nouveaux membres, de les invités sur le discord et de les accompagner dans leurs candidatures.",
        },
        { name: "Communication",
          value: "* <@&1159492957431414936> : Elle est charger de communiquer l'ensemble des évènements qui sont proposer par la Ramirez au membre et habitant de Pines City. Elle doit également partager le serveur discord sur le discord de SRP via la pub dans le salon ⁠<#1113430149766058026>",
        },
        { name: "Modérateur",
          value: "* <@&1114681339422199910> :  il est chargé de maintenir le calme dans le serveur discord. Son rôle n’est que en lien avec le serveur. Il ne peut sanctionner un membres en jeu. Il participe dorénavant au recrutement.",
        }
      ])
      .setTimestamp()
      .setFooter({
        text: interaction.client.user.username,
        iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
      });

    const economie = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("btn-economie")
        .setLabel("Économie")
        .setStyle(ButtonStyle.Success)
        .setEmoji("💵")
    );
    const judiciaire = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("btn-judiciaire")
          .setLabel("Judiciaire")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("⚖️")
      );
    const communication = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("btn-communication")
          .setLabel("Communication")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("📢")
    );
    const moderateur = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("btn-mod")
          .setLabel("Modérateur")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("📖")
    );

    await interaction.reply({ embeds: [embed], components: [economie, judiciaire, communication, moderateur]});
  },
};