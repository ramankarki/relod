#!/usr/bin/env node

const chokidar = require('chokidar')
const { exec, fork } = require('child_process')

let FgYellow = '\x1b[33m',
  Reset = '\x1b[0m',
  FgGreen = '\x1b[32m',
  FgRed = '\x1b[31m',
  package = '[relod]',
  file = process.argv[2],
  setTimeoutId,
  childProcess

if (!file)
  return console.error(FgRed + package, 'Enter: relod filename.extension')

console.log(FgYellow + package, 'Watching file recursively:', file)

// search for all the files and start watching
chokidar.watch('.').on('all', (event, path) => {
  // console.log(event, path)
  clearTimeout(setTimeoutId)
  childProcess &&
    console.log(
      '\n' + FgGreen + package + ' Restarting due to changes on file:',
      path
    )

  setTimeoutId = setTimeout(() => {
    if (!childProcess) {
      console.log(FgGreen + package + ' Files loaded.')
      console.log(package, 'Starting `node', file + '`')
    }

    childProcess?.kill()
    console.log(Reset)
    childProcess = fork(file)
  }, 500)
})
//
