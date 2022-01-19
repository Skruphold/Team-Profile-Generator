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
        }
    ])
} 

addManager()