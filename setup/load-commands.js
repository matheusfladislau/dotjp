const { Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

function loadCommands(toJSON = true) {
    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);

    const commandsJson = [];
    const commandsCollection = new Collection();

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);

            if ('data' in command && 'execute' in command) {
                if (toJSON) {
                    commandsJson.push(command.data.toJSON());
                    continue;
                }
                commandsCollection.set(command.data.name, command);
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    if (toJSON) {
        return commandsJson;
    }
    return commandsCollection;
}

module.exports = { loadCommands };