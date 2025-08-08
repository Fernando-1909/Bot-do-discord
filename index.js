require('dotenv').config();
const express = require('express'); // Mantém o Railway feliz
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// ==== Servidor HTTP simples (keep-alive no Railway) ====
const app = express();
app.get('/', (req, res) => res.send('Bot está rodando! 🚀'));
app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor HTTP iniciado na porta ${process.env.PORT || 3000}`);
});

// ==== Cliente Discord ====
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();

// Carregar todos os comandos da pasta commands/
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    client.commands.set(command.data.name, command);
}

// Evento de interação de comandos
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Erro ao executar o comando.', ephemeral: true });
    }
});

// Evento quando o bot fica pronto
client.once('ready', () => {
    console.log(`✅ Bot online como ${client.user.tag}`);
    // Loop para manter processo vivo
    setInterval(() => {}, 1000 * 60);
});

// Login no Discord
client.login(process.env.DISCORD_TOKEN);