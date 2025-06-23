const { SlashCommandBuilder } = require('discord.js');
const { Daily } = require('../../database/models/Daily');
const { DailyUser } = require('../../database/models/DailyUser');
const { User } = require('../../database/models/User');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enter_hiragana')
        .setDescription('Escreva seu Hiragana do dia.')
        .addStringOption(option =>
            option.setName('palavra')
                .setDescription('Palavra em japones usando o hiragana do dia')
                .setRequired(true)
        ),
	async execute(interaction) {
		try {
            const ultimoDaily = await Daily.findOne({
                order: [['date', 'DESC']],
            });

            var instUser = await User.findOne({
                where: {
                    id: interaction.user.id,
                }
            });

            if (instUser == null) {
                instUser = await User.create({
                    id: interaction.user.id,
                    username: interaction.user.username
                })
            }

            const instDailyUser = await DailyUser.findOne({
                where: {
                    id_daily: ultimoDaily.id,
                    id_user: instUser.id
                }
            });

            if (instDailyUser != null) {
                return await interaction.reply(`<@${interaction.user.id}>, você já colocou a palavra diária: **${instDailyUser.word}**`);
            }

            const palavra = interaction.options.getString('palavra');
            await DailyUser.create({
                id_daily: ultimoDaily.id,
                id_user: instUser.id,
                word: palavra
            });

            return await interaction.reply(`Parabéns <@${interaction.user.id}>!\nA sua palavra: **${palavra}** foi registrada. :)\nhttps://media.tenor.com/vgnTqjRM8xYAAAAM/ccs.gif`);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: 'Ocorreu um erro ao inserir sua palavra de hoje.',
				ephemeral: true
			});
		}
	},
};