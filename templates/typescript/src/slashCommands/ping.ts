import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Shows bot latency'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply('🏓 Pong! Latency: ' + interaction.client.ws.ping + 'ms');
    },
};
