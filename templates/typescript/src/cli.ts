import chokidar from 'chokidar';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Client } from 'discord.js';
import { logger, showStartupBanner } from './utils/logger.js';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

let bot: Client | null = null;
let isRestarting: boolean = false;

async function startBot(): Promise<void> {
    try {
        if (bot) {
            await bot.destroy();
            bot = null;
        }

        showStartupBanner();
        logger.info('Bot starting...');

        const { default: { client } } = await import('./index.js');
        bot = client;

        logger.success('Bot successfully started!');
    } catch (error) {
        logger.error('There was a problem initializing the bot:', error);
        process.exit(1);
    }
}

function watchFiles(): void {
    const watcher = chokidar.watch(join(__dirname, '**', '*.{js,ts}'), {
        ignored: /(^|[/\\])\../,
        persistent: true
    });

    watcher.on('change', async (path: string) => {
        if (isRestarting) return;
        isRestarting = true;

        logger.warning('File change detected:', path);
        logger.info('Bot restarting...');

        try {
            // Clear Node.js require cache
            const cacheKeys = Object.keys(require.cache);
            for (const key of cacheKeys) {
                delete require.cache[key];
            }

            await startBot();
        } catch (error) {
            logger.error('Error during bot restart:', error);
        } finally {
            isRestarting = false;
        }
    });

    logger.info('File change detection started. Changes will be automatically loaded.');
}

// Main function
async function main(): Promise<void> {
    await startBot();
    watchFiles();
}

// Error handling
process.on('unhandledRejection', (error: Error) => {
    logger.error('Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception:', error);
    process.exit(1);
});

main();
