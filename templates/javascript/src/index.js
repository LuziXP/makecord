//--------------------------------
//  Thanks for using Makecord :)
//--------------------------------

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { config } = require('./config');
const { loadCommands } = require('./handlers/commandHandler');
const { loadEvents } = require('./handlers/eventHandler');
const { logger } = require('./utils/logger');

let connectDatabase;
try {
    connectDatabase = require('./database').connectDatabase;
} catch (err) {
    connectDatabase = null;
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.commands = new Collection();
client.slashCommands = new Collection();

async function init() {
    try {
        if (connectDatabase) {
            await connectDatabase();
        }

        await loadCommands(client);
        logger.success('Commands loaded!');
        
        await loadEvents(client);
        logger.success('Events loaded!');
        
        await client.login(config.token).then(() => {
            logger.success('Bot successfully started!');
        }).catch(error => {
            if (error.code === 'TokenInvalid') {
                logger.error('The bot token is not provided. Please provide the bot token in the "config.js" file.');
                process.exit(1);
            }
            throw error;
        });
    } catch (error) {
        logger.error('An error occurred:', error);
        process.exit(1);
    }
}

init();

module.exports = { client };
