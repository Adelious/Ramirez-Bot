const { Events } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: Events.GuildMemberAdd,
  once: true,
  execute: async (member) => {
    // Changement de nom discord en le nom et prénom RP in game
    const apiURL = "https://api.simple-roleplay.fr/public/user.php";

    try {
      const response = await axios.get(apiURL, {
        params: {
          id: member.id,
        },
      });

      if (response && response.data) {
        const { name } = response.data;
        if (name && name.trim() !== "") {
          member.setNickname(name, "Renamed");
          nom = name;
          console.log(
            `${member.user.username} a rejoint le serveur et a été nommé ${name}.`
          );
        } else {
          member.setNickname("Pas de nom RP.", "Renamed");
        }
      }
    } catch (error) {
      console.error(
        "Error occurred while fetching data from the API : L'utilisateur n'a pas d'identifiants discord associé ou ",
        error
      );
      member.user.send(
        ":x: Je ne parviens pas à vous assigner le nom et prénom RP sur le serveur."
      );
    }

    console.log(
      `${member.user.username} a rejoint le serveur mais n'a pas pu être nommé.`
    );
  },
};
