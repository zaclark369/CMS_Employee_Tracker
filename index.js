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
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Employees', "Add Role", "Update", 'EXIT']
        }
    );
    
    const instructArry = uInstruction.instruction.split(' ');
    const parseUInstruction = instructionArray(instructArry);
    await databaseDirections[parseUInstruction]();
    start();
}

start();