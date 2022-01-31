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
    employeesArray.forEach((obj) => {
      if (obj.employee_id === obj.manager_id) {
        managersArray.push({ 'last name': obj.last_name, id: obj.manager_id });
      }
    });

    const idArrayEl = await query(`SELECT MAX(employee_id) AS idMax FROM employees`
    ).catch((err) => {
        throw new Error(err);
    });
    const { idMax } = idArrayEl[0];

    managersArray.push({ 'last name': 'self', id: idMax + 1});
    

    const managersChoiceArry = managersArray.map((manager) => {
        return `${manager['last name']} - ID#${manager['id']}`;
    });

    const rolesArray = [];
    const rolesTitle = await query( `SELECT title FROM roles`).catch((err) => {
        throw new Error(err);
    });
    rolesTitle.forEach((obj) => {
        rolesArray.push(obj.title);
    });


    // add employee
    const { first_name, last_name, role, manager } = await inquirer.prompt ([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'first_name',
          },
          {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'last_name',
          },
          {
            type: 'list',
            message: 'What is the employees role?',
            name: 'role',
            choices: rolesArray,
          },
          {
            type: 'list',
            message: 'who is their manager to be?',
            name: 'manager',
            choices: managersChoiceArry,
          },
    ]);


    // selecting roles here 

    const roleIdArr = await query(
        'SELECT role_id FROM roles WHERE title = ?',
        role
      ).catch((err) => {
        throw new Error(err);
      });

    //   take roles and manager ids and combine them for the obj
      const role_id = roleIdArr[0].role_id;
      const manager_id = managersArray[managersChoiceArry.indexOf(manager)].id;
  
      const { insertId } = await query(querySql, [
        first_name,
        last_name,
        role_id,
        manager_id,
      ]).catch((err) => {
        throw new Error(err);
      });
      console.log('successfully added employee #', insertId);
    }

    // insert id number into employee
    


    // to be added
    // update employeesRole

    

    // export employees

}


    module.exports = Employees;
