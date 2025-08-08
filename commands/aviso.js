import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('aviso')
  .setDescription('Envia um aviso para o servidor.')
  .addStringOption(option =>
    option.setName('mensagem')
      .setDescription('Conteúdo do aviso')
      .setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  const mensagem = interaction.options.getString('mensagem');

  await interaction.reply({
    content: `@everyone 📢 **Aviso:** ${mensagem}`,
    allowedMentions: { parse: ['everyone'] }
  });
}
