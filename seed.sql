-- paste below schema_test in workbench
INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO department (name)
VALUES ("Sales");

INSERT INTO department (name)
VALUES ("Accounting");

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("IT Support", 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Reynolds", 1, null), ("Blake", "Lively", 1, null), ("Jack", "Black", 1, null),
VALUES ("Ro", "Phillips", 1, null), ("Kiera", "Cullen", 1, null), ("Elena", "Baurkot", 1, null),
VALUES ("Seth", "Rogan", 1, null), ("Pete", "Davidson", 1, null), ("Jennifer", "Aniston", 1, null),
