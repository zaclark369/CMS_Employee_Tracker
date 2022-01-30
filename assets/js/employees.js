const inquirer = require('inquirer');
const util = require('util');

class Employees {
    constructor(database) {
        this.db = database;
    }

    viewEmployees() {
        const sql = `SELECT * FROM employees`;

        this.db.query(sql, (err, results) => {
            if (err) {
                throw new Error(err);
            } else {
                console.table(results);
            }
        });
    }

    async addEmployee() {
        const query = util.promisify(this.db.query).bind(this.db);
        const querySql = `INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
        
        const employeesArray = await query(
            `SELECT employee_id, last_name, manager_id FROM employees JOIN roles ON employees.role_id = roles.role_id`
    ).catch((err) => {
      throw new Error(err);
    });
        
    const managersArray = [];
    employeeSqlArr.forEach((obj) => {
      if (obj.employee_id === obj.manager_id) {
        managersArray.push({ 'last name': obj.last_name, id: obj.manager_id });
      }
    });


