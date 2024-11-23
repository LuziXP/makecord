import { 
    Client, 
    Collection, 
    Message, 
    ChatInputCommandInteraction, 
    SlashCommandBuilder, 
    RESTPostAPIApplicationCommandsJSONBody,
    ApplicationCommandDataResolvable
} from 'discord.js';

export interface Command {
    name: string;
    description: string;
    execute: (message: Message, args: string[]) => void;
}

export interface SlashCommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface ExtendedClient extends Client {
    commands: Collection<string, Command>;
    slashCommands: Collection<string, SlashCommand>;
    commandArray: ApplicationCommandDataResolvable[];
}
