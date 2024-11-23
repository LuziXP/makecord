import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadCommands(client) {
    client.commands = new Collection();
    client.slashCommands = new Collection();
    client.commandArray = [];

    // Normal komutları yükle
    const commandsPath = join(__dirname, '..', 'commands');
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const command = (await import('file://' + filePath)).default;
        client.commands.set(command.name, command);
    }

    // Slash komutları yükle
    const slashCommandsPath = join(__dirname, '..', 'slashCommands');
    const slashCommandFiles = readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

    for (const file of slashCommandFiles) {
        const filePath = join(slashCommandsPath, file);
        const command = (await import('file://' + filePath)).default;
        
        if ('data' in command && 'execute' in command) {
            client.slashCommands.set(command.data.name, command);
            client.commandArray.push(command.data.toJSON());
        }
    }
}
