import { Client, Events } from 'discord.js';
import { ExtendedClient } from '../types.js';

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        const extendedClient = client as ExtendedClient;
        console.log(client.user?.tag + ' is now online!');
        
        // Update slash commands
        if (client.application) {
            client.application.commands.set(extendedClient.commandArray)
                .then(() => {
                    console.log('Slash commands updated!');
                })
                .catch(error => {
                    console.error('Error updating slash commands:', error);
                });
        }
    },
};
