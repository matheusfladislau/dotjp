const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('../config.json');
const loadCommands = require('./load-commands');

const commands = loadCommands.loadCommands();

const rest = new REST().setToken(token);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
