// require mysql and inquirer
var mysql = require("mysql");
const inquirer = require("inquirer");
// do i need this confirm statement?
const confirm = require("inquirer-confirm");
// express packsge
// combine express and MySQL.. calls to database and live site
const express = require("express");

const app = express();
// when we deploy to heroku, heroku deals with it, if we are dealing with it, uses port 3000, MySQL deals with 3306
const PORT = process.env.PORT || 3000;

// MySQL DB Connection Information
// Available on port 3000 (make sure this port is still available)
var connection = mysql.createConnection({
  host: "localhost",
  // use the port to connect to MySQL
  port: 3306,
  user: "root",
  password: "",
  database: "employees",
});

// var showroles;
// var showdepartments;
// var showemployees;

// Initiate MySQL Connection
// Connect to MySQL without running workbench
connection.connect(function (err) {
  if (err) {
    console.error("Error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  displayMenu();
});

app.listen(PORT, () => console.log("Listening on port: " + PORT));

// Show inquirer menu
function displayMenu() {
  inquirer
    .prompt({
      type: "list",
      message: "Welcome to Employee Tracker. What would you like to do?",
      name: "choices",
      choices: [
        "View employee list",
        "View departments",
        "View all roles",
        "Add employee",
        "Add department",
        "Add role",
        "Update role",
        "Exit",
      ],
    })
    .then(function (res) {
      console.log(res);
      menu(res.choices);
    });
}

// is a switch statement the most dry way of writing this program?
// passing the parameter option to all of the cases in the switch statement
function menu(option) {
  switch (option) {
    case "View employee list":
      viewAllEmployees();
      break;
    case "View departments":
      viewAllDepartments();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "Add employee":
      addEmployee();
      break;
    case "Add department":
      addDept();
      break;
    case "Add role":
      addRole();
      break;
    case "Update role":
      updateRole();
      break;
  }
}

function viewAllEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    function (err, res) {
      console.table(res);
    }
  );
  displayMenu();
}

function viewAllDepartments() {
  connection.query("SELECT * from department", function (err, res) {
    console.table(res);
  });
  displayMenu();
}

function viewAllRoles() {
  connection.query("SELECT * from role", function (err, res) {
    console.table(res);
  });
  displayMenu();
}

// updating and adding, examples in MySQL activity 10

// look up api to get a.. random user generator

//Add departments
function addDept() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((response) => {
      let query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: response.name,
        },
        function (err) {
          if (err) throw err;
          console.table(response);
          displayMenu();
        }
      );
    });
}

//Add roles and prompt user choices
function addRole() {
  connection.query("SELECT * from department", function (err, res) {
    inquirer
      .prompt([
        {
          name: "Title",
          type: "input",
          message: "Please input the role: ",
        },
        {
          name: "Salary",
          type: "input",
          message: "Please input the salary: ",
        },
        {
          name: "department",
          type: "list",
          message: "Please input the department: ",
          choices: function () {
            var department = [];
            for (var i = 0; i < res.length; i++) {
              department.push({
                name: res[i].name,
                value: res[i].id,
              });
            }
            return department;
          },
        },
      ])
      .then(function (response) {
        //connecting query to add title, salary
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: response.Title,
            salary: response.Salary,
            department_id: response.department,
          },

          function (err) {
            if (err) throw err;
            console.table(response);
            displayMenu();
          }
        );
      });
  });
}

// select role function queries role title for adding employee questions

function createEmployee(first_name, last_name, role_id) {
  connection.query(
    "INSERT employee SET ?",
    [
      {
        first_name,
        last_name,
        role_id,
      },
    ],
    (err, results) => {
      if (err) console.log(err);
      displayMenu();
    }
  );
}

function addEmployee() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.role_id FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "firstname",
            type: "input",
            message: "Please enter the employees first name",
          },

          {
            name: "lastname",
            type: "input",
            message: "Please enter the employees last name",
          },

          {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: function () {
              var roles = [];
              for (var i = 0; i < res.length; i++) {
                roles.push({
                  name: res[i].title,
                  value: res[i].role_id,
                });
              }
              console.log(roles);
              return roles;
            },
          },
        ])
        .then(function (value) {
          console.log(value);
          createEmployee(value.firstname, value.lastname, value.role);
          displayMenu();
        });
    }
  );
}
function updateRole() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.role_id FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "employee",
            type: "rawlist",
            choices: function () {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push({
                  name: res[i].first_name + " " + res[i].last_name,
                  value: res[i].id,
                });
              }
              console.log(lastName);
              return lastName;
            },
            message: "Please select an employee",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the employee's new title?",
            choices: function () {
              var roles = [];
              for (var i = 0; i < res.length; i++) {
                roles.push({
                  name: res[i].title,
                  value: res[i].role_id,
                });
              }
              return roles;
            },
          },
        ])
        .then((value) => {
          console.log(value);
          updateEmployeeDB(value.role.value, value.employee.value);
        });
    }
  );
}

function updateEmployeeDB(role_id, id) {
  connection.query(
    "UPDATE employee SET ? WHERE ? ",
    [
      {
        role_id,
      },
      {
        id,
      },
    ],
    (err, results) => {
      if (err) console.log(err);
      displayMenu();
    }
  );
}
