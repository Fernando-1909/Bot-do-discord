const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('evento')
        .setDescription('Cria um evento no servidor.')
        .addStringOption(option =>
            option.setName('nome')
                .setDescription('Nome do evento')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('descricao')
                .setDescription('Descrição do evento')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('data')
                .setDescription('Data e hora no formato YYYY-MM-DDTHH:MM:SS')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const nome = interaction.options.getString('nome');
        const descricao = interaction.options.getString('descricao');
        const data = new Date(interaction.options.getString('data'));

        try {
            await interaction.guild.scheduledEvents.create({
                name: nome,
                scheduledStartTime: data,
                privacyLevel: 2,
                entityType: 3,
                description: descricao,
                channel: interaction.channelId,
            });

            await interaction.reply(`✅ Evento "${nome}" criado para ${data.toLocaleString()}`);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: 'Erro ao criar o evento.', ephemeral: true });
        }
    }
};
