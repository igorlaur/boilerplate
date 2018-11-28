const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const question = [
  {
    name: 'project-type',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: [ 'Somos Micro Service' ]
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
  {
    name: 'project-teste',
    type: 'input',
    message: 'Project teste:',
    validate: (input) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  },
];


// Leitor
// console no dir para ver se é uma lista
const read = dir => 
fs.readdirSync(dir).reduce((files, file) => {
  const name = path.join(dir, file);
  const isDirectory = fs.statSync(name).isDirectory()
  return isDirectory ? [...files, ...read(name)] : [...files, name]
}, [])

const readWriteAsync = (path, regex, value) => new Promise((res, rej) => {
  fs.readFile(path, 'utf-8', async (err, data) => {
    if (err) return rej(err)
    
    const newValue = data.replace(regex, value)
    
    // Salvando
    await saveFile(path, newValue).then((save) => {
      console.log(`Abrindo path: ${path}, Regex: ${regex}, Valor: ${value}`)
      return res(save)
    })
  })
})

// open the file in writing mode, adding a callback function where we do the actual writing
//fs.open(path, 'w', function(err, fs) {  
  //if (err) {
    //  throw 'could not open file: ' + err;
  //}
//fs.close(path)

const saveFile  = (path, newValue) => new Promise((res, rej) => {
  fs.writeFile(path, newValue, 'utf-8',  (err) => {
    if (err) rej(err)
    else{
      console.log(`Salvando o path: ${path}`)
      res(true)
    } 
  })
})

// Questões
inquirer.prompt(question)
  .then(answers => {
    const rules = {
      "Somos Micro Service": {
        "$defaultName": answers['project-name'],
        "$teste": answers['project-teste']
      }
    }

    Object.keys(rules[answers['project-type']]).forEach(async (key) => {
      const val = rules[answers['project-type']][key]
      read('/home/igor/base-api').forEach(async path => await readWriteAsync(path, key, val))
    })
})
