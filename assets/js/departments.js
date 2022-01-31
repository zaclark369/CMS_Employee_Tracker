const inquirer = require('inquirer');

const util = require('util');

class Departments {
    constructor(database) {
        this.db = database;
    }

    viewDepartments() {
        const sql = `SELECT * FROM Departments`;

        this.db.query(sql, (err, results) => {
            if (err) {
                throw err;
            } else {
                console.table(results);
            }
        });
    }

    async addDepartment() {
        const query = util.promisify(this.db.query).bind(this.db);
        const sql = `INSERT INTO Departments (name) VALUES (?)`;
        const {Department} = await inquirer.prompt([
            {
                type: 'input',
                message: "What department are you adding?",
                name: 'Department'
            },
        ]);
        const { insertId } = await query(sql, Department).catch((err) => {
            throw new Error(err);
        });
        console.log(`department #${insertId} added correctly`);
    }
}

module.exports=Departments;