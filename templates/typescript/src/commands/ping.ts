import { Message } from 'discord.js';

export default {
    name: 'ping',
    description: 'Shows bot latency',
    execute(message: Message, args: string[]) {
        message.reply(' Pong! Latency: ' + message.client.ws.ping + 'ms');
    },
};
