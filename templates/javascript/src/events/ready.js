const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`${client.user.tag} is now online!`);
        
        // Update slash commands
        if (client.application) {
            const slashCommands = Array.from(client.slashCommands.values());
            const commandData = slashCommands.map(cmd => cmd.data);
            
            client.application.commands.set(commandData)
                .then(() => {
                    console.log('Slash commands updated!');
                })
                .catch(error => {
                    console.error('Error updating slash commands:', error);
                });
        }
    },
};
