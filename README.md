# makecord-create

Quickstart template generator for Discord.js bots.

## Usage

```bash
npx makecord-create
```

This command will launch an interactive CLI with the following options:

1. Project name (or option to use existing folder)
2. TypeScript support
3. Database integration
4. Database type selection (MongoDB or CroxyDB)

## Features

- Modern Discord.js v14 support
- JavaScript or TypeScript templates
- Optional database integration (MongoDB/CroxyDB)
- Ready-to-use project structure
- Basic command examples
- Hot-reloading support
- Colorful terminal output
- Type-safe configurations

## After Installation

1. Edit `config.js` (or `config.ts`) and add your bot token
2. Install the necessary packages: `npm install`
3. Start the bot: `npm start`

## Project Structure

```
src/
├── commands/          # Regular message commands
├── slashCommands/     # Slash commands
├── events/           # Discord.js event handlers
├── handlers/         # Command and event loaders
├── utils/           # Utility functions
└── config.js        # Bot configuration
```

## License

MIT

## Author

Created with ❤️ by LuziXP
