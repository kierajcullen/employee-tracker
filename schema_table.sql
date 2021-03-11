INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Lead", 100000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kiera", "Cullen", 1, null);