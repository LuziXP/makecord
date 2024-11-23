import { Events, Message } from 'discord.js';
import { config } from '../config.js';
import { ExtendedClient } from '../types.js';

export default {
    name: Events.MessageCreate,
    execute(message: Message) {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.prefix)) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        const client = message.client as ExtendedClient;
        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Komutu çalıştırırken bir hata oluştu!');
        }
    },
};
