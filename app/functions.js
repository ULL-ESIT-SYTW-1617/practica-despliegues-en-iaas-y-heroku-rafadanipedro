const spawn = require('child_process').spawn
const Git = require('simple-git')
const fs = require('fs')
const path = require('path')

// Revisar si existe el directorio gitbook, si no crearlo.
function clonar(url) {
  let git = Git(__dirname)
  return git.clone(url, path.resolve(__dirname, 'gitbook'))
}
function pull(){
  let git = Git(path.resolve(__dirname, 'gitbook'))
  return git.pull()
}

function generarGitbook () {
  return new Promise((resolve, reject) => {
    const gb = spawn('bash', ['app/generarGitbook.sh'])

    gb.stdout.on('data', data => process.stdout.write(data.toString()))
    gb.stderr.on('data', data => process.stderr.write(data.toString()))
    gb.on('close', code => code ? reject() : resolve())
  })
}


module.exports = {
  clonar,
  pull,
  generarGitbook
}