// require mysql and inquirer
// MAKE SURE TO INSTALL YOUR PACKAGES!!! YOU ALWAYS FORGET
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

  // make sure the grab the correct values.. is this from the inspect tool?
  // connection.query("SELECT * from role", function (err, res) {
  //   showroles = res.map((role) => ({ name: role.title, value: role.id }));
  // });
  // connection.query("SELECT * from department", function (err, res) {
  //   showdepartments = res.map((dep) => ({ name: dep.name, value: dep.id }));
  // });
  // connection.query("SELECT * from employee", function (err, res) {
  //   // console.log(err, res);
  //   showemployees = res.map((emp) => ({
  //     name: `${emp.first_name} ${emp.last_name}`,
  //     value: emp.id,
  //   }));
  // });
  displayMenu();
});

app.listen(PORT, () => console.log("listening on port: " + PORT));

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
}

function viewAllDepartments() {
  // console.log("View Departments");
  connection.query("SELECT * from department", function (err, res) {
    console.table(res);
  });
}

function viewAllRoles() {
  connection.query("SELECT * from role", function (err, res) {
    console.table(res);
  });
}

// updating and adding, examples in MySQL activity 10
