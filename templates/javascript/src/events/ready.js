import { Events } from 'discord.js';

export default {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(client.user.tag + ' is now online!');
        
        // Update slash commands
        if (client.application) {
            client.application.commands.set(client.commandArray)
                .then(() => {
                    console.log('Slash commands updated!');
                })
                .catch(error => {
                    console.error('Error updating slash commands:', error);
                });
        }
    },
};
