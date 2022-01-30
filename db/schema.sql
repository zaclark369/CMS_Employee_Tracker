
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

DROP TABLE IF EXISTS Departments;
CREATE TABLE Departments (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS Roles;
CREATE TABLE Roles (
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(20) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    
);

DROP TABLE IF EXISTS Employees;
CREATE TABLE Employees (
    employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
    ON DELETE SET NULL
);