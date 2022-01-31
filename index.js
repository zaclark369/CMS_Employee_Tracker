const inquirer = require('inquirer');
const db = require('./assets/envSqlConfig');
const instructionList = require('./assets/js/instructionList');
const databaseDirections = new instructionList(db);
const instructionArray = require('./assets/js/instructionArray');

const start = async () => {
    console.log('we are in the start process');
    const uInstruction = await inquirer.prompt(
        {
            type: 'list',
            name: 'instruction',
            message: 'How would you like to process',
            choices: ['view departments', 'view roles', 'view employees', 'add department', 'add employee', "add roles", "update", 'finish']
        }
    );
    
    const instructArry = uInstruction.instruction.split(' ');
    console.log(instructArry);
    const parseInstruction = instructionArray(instructArry);
    console.log(parseInstruction);
    await databaseDirections[parseInstruction]();
    start();
}

start();