const inquirer = require('inquirer');
const util = require('util');

// bring in all the methods and run them

const Roles = require('./roles');
const Employees = require('./employees');
const Departments = require('./departments');

class instructionList {
    constructor(database) {
        this.db = database;
        this.Roles = new Roles(database);
        this.Employees = new Employees(database);
        this.Departments = new Departments(database);
    }

    viewDepartments() {
        this.Departments.viewDepartments();
    }

    async addDepartment() {
        await this.Departments.addDepartment();
    }

    viewRoles() {
        this.Roles.viewRoles();
    }

    async addRoles() {
        await this.Roles.addRoles();
    }

    viewEmployees() {
        this.Employees.viewEmployees();
    }

    async addEmployee() {
        await this.Employees.addEmployee();
    }

    // async updateEmployeeRole() {
    //     await this.Employees.updateEmployeeRole();
    // }

    finish() {
        process.exit(this);
    }

}

module.exports = instructionList;