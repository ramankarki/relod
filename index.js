#!/usr/bin/env node

const chokidar = require('chokidar')
const { exec, fork } = require('child_process')

let FgYellow = '\x1b[33m',
  Reset = '\x1b[0m',
  FgGreen = '\x1b[32m',
  package = '[relod]',
  command = process.argv[2],
  setTimeoutId,
  childProcess

if (
  !command ||
  command === '-v' ||
  command === '--version' ||
  command === '--help'
) {
  console.log('\nrelod <command>')
  console.log('relod @1.0.0\n')
  console.log('Usage:\n')
  console.log(
    'relod filename \t Entry file name of your node server. Same as you use in nodemon.'
  )
  console.log('relod --help \t Get help.')
  console.log('relod -v \t Get version.')
  console.log('relod --version  Get version.')

  return
}

console.log(FgYellow + package, 'Watching file recursively:', command)

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
      console.log(package, 'Starting `node', command + '`')
    }

    childProcess?.kill()
    console.log(Reset)
    childProcess = fork(command)
  }, 500)
})
//
