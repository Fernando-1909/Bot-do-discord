const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('aviso')
        .setDescription('Envia um aviso para o servidor.')
        .addStringOption(option =>
            option.setName('mensagem')
                .setDescription('Conteúdo do aviso')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const mensagem = interaction.options.getString('mensagem');
        await interaction.reply({
            content: `@everyone 📢 **Aviso:** ${mensagem}`,
            allowedMentions: { parse: ['everyone'] }
        });
    }
};
