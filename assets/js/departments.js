const inquirer = require('inquirer');

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
        const query = util.promisify(`INSERT INTO Departments  `);
        const sql = `INSERT INTO Departments (name) VALUES (?)`;
        const {Department} = await inquirer.prompt([
            {
                type: 'input',
                message: "What department are you adding?",
                name: 'Department'
            },
        ]);
        const { addId } = await this.db.query(sql, (err, results) => {
            throw new Error(err);
        })
        console.log(`department #${addId} added correctly`);
    }
}

module.exports=Departments;