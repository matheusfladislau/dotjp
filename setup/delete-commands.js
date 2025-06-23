const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');

const rest = new REST().setToken(token);

(async () => {
	try {
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: [] },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();