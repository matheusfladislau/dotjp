const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const { loadCommands } = require('../setup/load-commands');
const { loadEvents } = require('../setup/load-events');
const { sequelizeInstance, testConnection } = require('../database');
const { loadModels } = require('../database/load-models');
const { setupAssociations } = require('../database/associations');
const { seedHiragana } = require('../database/setup/seed-hiragana');
const { startDailyTask } = require('../cron/daily');


(async () => {
	const client = new Client({ intents: [GatewayIntentBits.Guilds] })
	client.login(token);

	try {
		console.log("[COMMANDS] - Loading commands.");
		client.commands = loadCommands(false);
		console.log("[COMMANDS] - Done.");
	} catch (error) {
		console.error("[COMMANDS] - Failed:", error);
		process.exit(1);
	}

	try {
		console.log("[EVENTS] - Loading events.");
		const events = loadEvents();
		for (const event of events) {
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
		}
		console.log("[EVENTS] - Done.");
	} catch (error) {
		console.error("[EVENTS] - Failed:", error);
		process.exit(1);
	}

	try {
		console.log("[DATABASE] - Connecting...");
		await testConnection();

		loadModels();
		setupAssociations();

		await sequelizeInstance.sync({force: true});

		seedHiragana();
		console.log("[DATABASE] - Hiraganas inserted successfully.");

		console.log("[DATABASE] - Done.");
	} catch (error) {
		console.error("[DATABASE] - Failed to connect or sync:", error);
		process.exit(1);
	}

	startDailyTask(client);
})();