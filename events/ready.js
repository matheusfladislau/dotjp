const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Sucesso! Bot iniciado como: ${client.user.tag}`);
    }
}