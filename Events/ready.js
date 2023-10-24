const { Events, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		await console.log(`Ready! Logged in as ${client.user.tag}`);

		await client.user.setPresence({
			activities: [{
				name: 'shop.villis.fr',
				type: ActivityType.Playing,
			}],
			status: 'dnd',
		  })
	},
};