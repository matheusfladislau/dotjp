const { REST, Routes } = require('discord.js');
const { clientId, token } = require('../config.json');
const loadCommands = require('./load-commands');

const commands = loadCommands.loadCommands();

const rest = new REST().setToken(token);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
