const inquirer = require('inquirer');
const util = require('util');

class Roles {
    constructor(database) {
        this.db = database;
  }

  viewRoles() {
      const sql = `SELECT * FROM roles`;

      this.db.query(sql, (err, results) => {
          if (err) {
              throw new Error(err);
          } else {
              console.table(results);
          }
      });
  }

  async addRoles() {
      const query = util.promisify(this.db.query).bind(this.db);
      const querySql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
      const SqlArray = await query(
          `SELECT COUNT(department_id) AS departmentCount FROM Departments`
      );

      const {departmentCount} = SqlArray[0];

      const countingArray = [];
      for (let i = 1; i<= departmentCount; i++) {
          countingArray.push(i);
      }

      const { title, salary, department_id } = await inquirer.prompt ([
          {
              type:'input',
              message: 'title?',
              name: 'title',
          },
          {
              type: 'input',
              message: 'salary?',
              name: 'salary',
          },
          {
              type: 'list',
              message: 'Department id?',
              name: 'department_id',
              choices: countingArray,
          },
      ]),

      const {insertId } = await query(querySql, [
          title, salary, department_id
      ]).catch((err) => {
          throw new Error(err);
      });
      console.log('success in adding #' + insertId);
  }
}

module.exports = Roles;
