import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config.js';
import { loadCommands } from './handlers/commandHandler.js';
import { loadEvents } from './handlers/eventHandler.js';
import { logger } from './utils/logger.js';
import { Command, SlashCommand, ExtendedClient } from './types.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
}) as ExtendedClient;

client.commands = new Collection<string, Command>();
client.slashCommands = new Collection<string, SlashCommand>();

try {
    await loadCommands(client);
    logger.success('Commands loaded!');
    
    await loadEvents(client);
    logger.success('Events loaded!');
    
    await client.login(config.token).catch(error => {
        if (error.code === 'TokenInvalid') {
            logger.error('The bot token is not provided. Please provide the bot token in the “config.js” file.');
            process.exit(1);
        }
        throw error;
    });
} catch (error) {
    logger.error('There was an error while starting the bot:', error);
    process.exit(1);
}

export default { client };
