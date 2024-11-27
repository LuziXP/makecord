#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.green('Welcome to Makecord 1.0.5 (BETA)'));
console.log(chalk.yellow('https://npmjs.com/makecord-create\n'));

const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name (you can use the existing folder by leaving it blank):',
        default: ''
    },
    {
        type: 'confirm',
        name: 'database',
        message: 'Add database?',
        default: false
    },
    {
        type: 'list',
        name: 'databaseType',
        message: 'Choose a database to use?',
        choices: ['MongoDB', 'CroxyDB'],
        when: (answers) => answers.database
    }
];

function copyFolderSync(from, to) {
    if (!fs.existsSync(to)) {
        fs.mkdirSync(to, { recursive: true });
    }

    fs.readdirSync(from).forEach(element => {
        const fromPath = path.join(from, element);
        const toPath = path.join(to, element);
        
        if (fs.lstatSync(fromPath).isFile()) {
            fs.copyFileSync(fromPath, toPath);
        } else {
            copyFolderSync(fromPath, toPath);
        }
    });
}

async function createProject() {
    try {
        const answers = await inquirer.prompt(questions);
        
        console.log('\n' + chalk.cyan('Project Details:'));
        console.log(chalk.yellow('Project Name: ') + (answers.projectName || 'Current Folder'));
        console.log(chalk.yellow('Database: ') + (answers.database ? answers.databaseType : 'No'));

        const confirmation = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Do you confirm?',
                default: true
            }
        ]);

        if (!confirmation.confirm) {
            console.log(chalk.red('Operation cancelled.'));
            process.exit(0);
        }

        // Project creation process starts
        const spinner = ora('Project creation in progress...').start();

        const projectPath = answers.projectName 
            ? path.join(process.cwd(), answers.projectName)
            : process.cwd();

        // If new folder is going to be created
        if (answers.projectName) {
            if (!fs.existsSync(projectPath)) {
                fs.mkdirSync(projectPath, { recursive: true });
            }
        }

        // Copy template files
        const templatePath = path.join(__dirname, 'templates', 'javascript');
        copyFolderSync(templatePath, projectPath);

        // Update package.json with project name
        const packageJsonPath = path.join(projectPath, 'package.json');
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        
        // Set package name based on project name or current directory
        packageJson.name = answers.projectName || path.basename(process.cwd());

        // Add database
        if (answers.database) {
            // Copy database file
            const dbTemplatePath = path.join(__dirname, 'templates', 'database', 
                answers.databaseType.toLowerCase() + '.js');
            
            const dbFilePath = path.join(projectPath, 'src', 'database.js');
            fs.mkdirSync(path.dirname(dbFilePath), { recursive: true });
            fs.copyFileSync(dbTemplatePath, dbFilePath);

            // For MongoDB, also copy schemas
            if (answers.databaseType === 'MongoDB') {
                const schemasPath = path.join(__dirname, 'templates', 'database', 'schemas');
                const targetSchemasPath = path.join(projectPath, 'src', 'schemas');
                copyFolderSync(schemasPath, targetSchemasPath);
                packageJson.dependencies.mongoose = '^7.6.5';
            } else {
                packageJson.dependencies.croxydb = '^0.0.7';
            }
        }

        // Write updated package.json
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        spinner.succeed('Project successfully created!');
        
        console.log('\n' + chalk.green('Start with:'));
        if (answers.projectName) {
            console.log(chalk.cyan(`cd ${answers.projectName}`));
        }
        console.log(chalk.cyan('npm install'));
        console.log(chalk.cyan('npm start'));

    } catch (error) {
        console.error(chalk.red('An error occurred:'), error);
        process.exit(1);
    }
}

createProject();
