const fs = require('fs');
const inquirer = require('inquirer');
const pageTemplate = require('./src/page-template');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const employeeArray = []

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            message: 'Name of the team manager?',
            name: 'name',
            validate: nameEntered => {
                if (nameEntered) {
                    return true;
                } else {
                    console.log('\nPlease enter the name of the manager.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "What is your manager's ID?",
            name: 'id',
            validate: idNum => {
                if (isNaN(idNum)) {
                    console.log("\nplease enter the manager's id.");
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "What is the manager's email?",
            name: 'email',
            validate: eMail => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eMail)
                if (valid) {
                    return true;
                } else {
                    console.log("\nPlease enter the manager's email.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "What is your manager's office number?",
            name: 'officeNumber',
            validate: officeNum => {
                if (isNaN(officeNum)) {
                    console.log("\nplease enter the manager's office number.");
                    return false;
                } else {
                    return true;
                }
            }
        }

    ])
    .then(managerData => {
        const { name, id, email, officeNumber } = managerData
        const manager = new Manager(name, id, email, officeNumber);
        console.log(manager);
        employeeArray.push(manager);
    })
};

const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            message: 'Please choose the position of the employee.',
            name: 'position',
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            message: "What is the employee's name?",
            name: 'name',
            validate: nameEntered => {
                if (nameEntered) {
                    return true;
                } else {
                    console.log('\nPlease enter the name of the employee.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "What is the employee's ID?",
            name: 'id',
            validate: idNum => {
                if (isNaN(idNum)) {
                    console.log('\nPlease enter the ID for the employee.');
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            message: "What is the employee's email?",
            name: 'email',
            validate: eMail => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(eMail)
                if (valid) {
                    return true;
                } else {
                    console.log("\nPlease enter the employee's email.");
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "What is the engineer's github username?",
            name: 'github',
            when: (input) => input.position === "Engineer",
            validate: nameEntered => {
                if (nameEntered) {
                    return true;
                } else {
                    console.log('\nPlease enter the github username for the engineer.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "What school is the intern coming from?",
            name: 'school',
            when: (input) => input.position === "Intern",
            validate: nameEntered => {
                if (nameEntered) {
                    return true;
                } else {
                    console.log('\nPlease enter the school that the intern came from.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            message: 'Would you like to add another employee?',
            name: 'confirmNewEmployee'
        }
    ])
    .then(employeeData => {
        const { name, id, email, position, github, school, confirmNewEmployee } = employeeData;
        let employee;

        if (position === "Engineer") {
            employee = new Engineer(name, id, email, github);
            console.log(employee);
        } else if (position === "Intern") {
            employee = new Intern(name, id, email, school);
            console.log(employee);
        }
        employeeArray.push(employee);

        if (confirmNewEmployee) {
            return addEmployee(employeeArray);
        } else {
            console.log(employeeArray)
            return employeeArray;
        }
    })
    
}

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, error => {
        if (error) {
            console.log(error);
            return
        } else {
            console.log("Succesful you have created your team profile.");
        }
    })
}

addManager()
    .then(addEmployee)
    .then(employeeArray => {
        return pageTemplate(employeeArray);
    })
    .then(newHtml => {
        return writeFile(newHtml);
    })
    .catch(error => {
        console.log(error);
    })