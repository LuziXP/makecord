export default {
    name: 'ping',
    description: 'Shows bot latency',
    execute(message, args) {
        message.reply('🏓 Pong! Latency: ' + message.client.ws.ping + 'ms');
    },
};
