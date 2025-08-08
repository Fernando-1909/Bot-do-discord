const { Client, GatewayIntentBits, Events } = require('discord.js');
const token = 'SEU_TOKEN_AQUI'; // Coloque seu token do bot

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`Bot logado como ${client.user.tag} 🎲`);
});

client.on(Events.MessageCreate, message => {
    // Ignorar mensagens de bots
    if (message.author.bot) return;

    // Verificar se começa com "/r"
    if (message.content.startsWith('/r')) {
        const lados = parseInt(message.content.slice(2)); // Pega o número após "/r"

        // Validação
        if (isNaN(lados) || lados < 2) {
            return message.reply('Por favor, use o formato `/rX`, onde X é o número de lados (mínimo 2).');
        }

        // Rolar o dado
        const resultado = Math.floor(Math.random() * lados) + 1;
        message.reply(`Você rolou um d${lados} e tirou **${resultado}**!`);
    }
});

client.login(token);
