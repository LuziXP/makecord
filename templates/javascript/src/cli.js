const chokidar = require('chokidar');
const path = require('path');
const { logger, showStartupBanner } = require('./utils/logger.js');

let client = null;
let isRestarting = false;
let isFirstStart = true;

async function startBot() {
    try {
        if (isFirstStart) {
            showStartupBanner();
            isFirstStart = false;
        }

        if (client) {
            await client.destroy();
            client = null;
        }

        logger.info('Bot starting...');

        const { client: newClient } = require('./index.js');
        client = newClient;
    } catch (error) {
        logger.error('There was a problem initializing the bot:', error);
        process.exit(1);
    }
}

async function reloadCommands() {
    try {
        // Clear require cache for command files
        Object.keys(require.cache).forEach(key => {
            if (key.includes('commands') || key.includes('slashCommands')) {
                delete require.cache[key];
            }
        });

        const { loadCommands } = require('./handlers/commandHandler.js');
        await loadCommands(client);
        logger.success('Commands reloaded!');
    } catch (error) {
        logger.error('Error reloading commands:', error);
    }
}

async function reloadEvents() {
    try {
        // Remove all listeners
        client.removeAllListeners();
        
        // Clear require cache for event files
        Object.keys(require.cache).forEach(key => {
            if (key.includes('events')) {
                delete require.cache[key];
            }
        });

        const { loadEvents } = require('./handlers/eventHandler.js');
        await loadEvents(client);
        logger.success('Events reloaded!');
    } catch (error) {
        logger.error('Error reloading events:', error);
    }
}

function watchFiles() {
    const watcher = chokidar.watch(path.join(__dirname, '**', '*.js'), {
        ignored: [/(^|[/\\])\../, 'node_modules'],
        persistent: true,
        ignoreInitial: true
    });

    watcher.on('change', async (filePath) => {
        if (isRestarting) return;
        isRestarting = true;

        logger.warning('File change detected:', filePath);

        try {
            if (filePath.includes('commands') || filePath.includes('slashCommands')) {
                // Reload commands
                await reloadCommands();
            } 
            else if (filePath.includes('events')) {
                // Reload events
                await reloadEvents();
            }
            else {
                logger.info('Core file changed, restarting bot...');
                Object.keys(require.cache).forEach(key => delete require.cache[key]);
                await startBot();
            }
        } catch (error) {
            logger.error('Error during reload:', error);
        } finally {
            isRestarting = false;
        }
    });

    logger.info('File change detection started. Changes will be automatically loaded.');
}

// Main function
async function main() {
    await startBot();
    watchFiles();
}

// Error handling
process.on('unhandledRejection', error => {
    logger.error('Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', error => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

main();
