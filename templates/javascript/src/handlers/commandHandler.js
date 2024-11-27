const fs = require('fs');
const path = require('path');
const { Collection } = require('discord.js');
const { logger } = require('../utils/logger');

async function loadCommands(client) {
    client.commands = new Collection();
    client.slashCommands = new Collection();
    client.commandArray = [];

    // Normal komutları yükle
    const commandsPath = path.join(__dirname, '..', 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        client.commands.set(command.name, command);
    }

    // Slash komutları yükle
    const slashCommandsPath = path.join(__dirname, '..', 'slashCommands');
    const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const filePath = path.join(slashCommandsPath, file);
        const command = require(filePath);
        
        if ('data' in command && 'execute' in command) {
            client.slashCommands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }
    }
}

module.exports = { loadCommands };
