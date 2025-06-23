const fs = require('node:fs');
const path = require('node:path');

function loadEvents() {
	const eventsPath = path.join(__dirname, '../events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	const events = [];

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);

		events.push({
			name: event.name,
			once: event.once,
			execute: event.execute,
		});
	}

	return events;
}

module.exports = { loadEvents };