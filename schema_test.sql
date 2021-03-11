DROP DATABASE IF EXISTS employees;

CREATE DATABASE employees;

USE employee;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(8,2) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id),
  -- Look up the use of the foreign key
  FOREIGN KEY (department_id) REFERENCES department(id),
);

CREATE TABLE employee (
    -- why do you need NOT NULL
  id INT NOT NULL AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id iNT NOT NULL,
  manager_id VARCHAR(30),
  PRIMARY KEY(id)

  FOREIGN KEY (role.id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
);

