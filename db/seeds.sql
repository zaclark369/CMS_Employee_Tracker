
INSERT INTO Departments (name)
VALUES ("C Suite"),
       ("Sales"),
       ("HR"),
       ("IT");

INSERT INTO Roles (title, salary, department_id)
VALUES ("CEO", 25.00, 1),
       ("Sales Manager", 15.00, 2),
       ("HR Manager", 16.00, 3),
       ("Junior IT", 9.00, 4),
       ("Sales Associate", 13.00, 2),
       ("HR Representative", 12.00, 3),
       ("CFO", 22.00, 1);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Clare", "Carroll", 1, 1),
       ("Steve", "Clark", 4, 1),
       ("Lego", "Man", 2, 3),
       ("Jeff", "Bazos", 5, 3),
       ("Sam", "Johnson", 3, 5),
       ("Road", "Runner", 6, 5),
       ("Yosemite", "Sam", 6, 6);