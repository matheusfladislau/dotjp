const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');
const { loadCommands } = require('../setup/load-commands');
const { loadEvents } = require('../setup/load-events');

const client = new Client({intents: [GatewayIntentBits.Guilds]})
client.login(token);

console.log("[COMMANDS] - Loading commands.");
client.commands = loadCommands(false);
console.log("[COMMANDS] - Done.");


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