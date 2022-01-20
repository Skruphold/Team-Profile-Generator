const fs = require('fs');
const inquirer = require('inquirer');
const pageTemplate = require('./src/page-template');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

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
                    console.log('Please enter the name of the manager');
                    return false;
                }
            }
        },
        {
            type: 'input',
            message: "What is your manager's ID",
            name: 'id',
            validate: idNum => {
                if (isNaN(idNum)) {
                    console.log("please enter the manager's id");
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
                    console.log("Please enter the manager's email");
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
                    console.log("please enter the manager's office number");
                    return false;
                } else {
                    return true;
                }
            }
        }

    ])
} 

addManager()