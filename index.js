const fs = require('fs');
const inquirer = require('inquirer');
const pageTemplate = require('./src/page-template');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');