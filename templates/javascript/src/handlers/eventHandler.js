const fs = require('fs');
const path = require('path');
const { logger } = require('../utils/logger');

async function loadEvents(client) {
    const eventsPath = path.join(__dirname, '..', 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
            logger.info(`Loaded one-time event: ${event.name}`);
        } else {
            client.on(event.name, (...args) => event.execute(...args));
            logger.info(`Loaded event: ${event.name}`);
        }
    }
}

module.exports = { loadEvents };
