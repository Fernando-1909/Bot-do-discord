const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('diceroll')
        .setDescription('Rola um dado com o número de lados escolhido.')
        .addIntegerOption(option =>
            option.setName('lados')
                .setDescription('Número de lados do dado')
                .setRequired(true)
        ),
    async execute(interaction) {
        const lados = interaction.options.getInteger('lados');

        if (isNaN(lados) || lados < 2) {
            return interaction.reply('Por favor, escolha um número de lados maior ou igual a 2.');
        }

        const resultado = Math.floor(Math.random() * lados) + 1;
        await interaction.reply(`Você rolou um d${lados} e tirou **${resultado}**!`);
    }
};
