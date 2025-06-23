const { SlashCommandBuilder } = require('discord.js');
const { Hiragana } = require('../../database/models/Hiragana');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hiragana')
		.setDescription('Mostra um Hiragana aleatório.'),
	async execute(interaction) {
		try {
			const count = await Hiragana.count();
			if (count === 0) {
				return await interaction.reply(`Nenhum hiragana foi encontrado no banco de dados, ${interaction.user.username}. :(`);
			}

			const randomIndex = Math.floor(Math.random() * count);
			const hiragana = await Hiragana.findOne({ offset: randomIndex });

			await interaction.reply(`🔤 **Kana:** ${hiragana.kana}\n📝 **Romaji:** ${hiragana.romaji}`);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'Ocorreu um erro ao buscar um hiragana.',
				ephemeral: true
			});
		}
	},
};