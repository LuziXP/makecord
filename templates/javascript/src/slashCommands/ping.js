import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows bot latency'),
    async execute(interaction) {
        await interaction.reply('🏓 Pong! Latency: ' + interaction.client.ws.ping + 'ms');
    },
};
