const fs = require('fs-extra')
const chalk = require('chalk')
const inquirer = require('inquirer')
const shelljs = require('shelljs')

// TBD
const app = async api => {
  return new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'name',
          name: 'name',
          message: "what's the name?",
          choices: ['Yes', 'No']
        }
      ])
      .then(answer => {
        resolve()
      })
  })
}

module.exports = app
