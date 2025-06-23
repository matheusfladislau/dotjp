const cron = require('node-cron');
const { Daily } = require('../database/models/Daily');
const { Hiragana } = require('../database/models/Hiragana');
const { channelId } = require('../config.json');

function startDailyTask(client) {
    cron.schedule('*/1 * * * *', async () => {
        try {
            const usedHiraganas = await Daily.findAll({ attributes: ['id_hiragana'] });
            const usedIds = usedHiraganas.map(d => d.id_hiragana);

            const available = await Hiragana.findAll({ 
                where: { 
                    id: { [require('sequelize').Op.notIn]: usedIds } 
                },
                raw: false
            });

            if (available.length === 0) {
                console.log("Todos os hiraganas foram usados. Reiniciando...");
                await Daily.destroy({ where: {} });
                return;
            }

            const random = available[Math.floor(Math.random() * available.length)];

            await Daily.create({
                id_hiragana: random.id,
                date: new Date()
            });

            const channel = await client.channels.fetch(channelId);
            await channel.send(`<@433736570269335552>!\n\n Novo Hiragana do dia!\n **${random.kana}** (${random.romaji})
                \nUse o comando \`/enter_hiragana\` para enviar uma palavra com esse kana!\nhttps://media.tenor.com/iGKBLd0oaIgAAAAM/tomoyo-daidouji.gif`);
        } catch (error) {
            console.error("Erro ao gerar hiragana diário:", error);
        }
    });
}

module.exports = { startDailyTask };