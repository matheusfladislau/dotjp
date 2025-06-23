const { SlashCommandBuilder } = require('discord.js');
const { Daily } = require('../../database/models/Daily');
const { DailyUser } = require('../../database/models/DailyUser');
const { Hiragana } = require('../../database/models/Hiragana');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('last_hiragana_sent')
        .setDescription('A última palavra com Hiragana que você enviou.'),
	async execute(interaction) {
		try {
            const ultimoDailyUser = await DailyUser.findOne({
                where: {
                    id_user: interaction.user.id
                },
                order: [['id_daily', 'DESC']],
            });

            if (ultimoDailyUser == null) {
                return await interaction.reply(`<@${interaction.user.id}>, você ainda não enviou nenhuma palavra!`);
            }

            const ultimoDaily = await Daily.findOne({
                where: {
                    id: ultimoDailyUser.id_daily
                }
            });

            const hiraganaUltimoDaily = await Hiragana.findOne({
                where: {
                    id: ultimoDaily.id_hiragana
                }
            });

            return await interaction.reply(`<@${interaction.user.id}>, a sua última palavra foi: ${ultimoDailyUser.word} para o Hiragana: **${hiraganaUltimoDaily.kana}** (${hiraganaUltimoDaily.romaji})`);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'Ocorreu um erro ao buscar sua última palavra inserida.',
				ephemeral: true
			});
		}
	},
};