'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Git = require('simple-git')
const fs = require('fs')
const spawn = require('child_process').spawn


const config = require('./package.json')

let git
if (fs.existsSync('./gitbook')) {
  git = Git(__dirname + '/gitbook')
} else {
  git = Git(__dirname)
}

let app = express();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(express.static('gitbook/_book'));

app.post('*', function (req, res) {
  if (/GitHub-Hookshot/.test(req.headers['user-agent'])) {
    if (fs.existsSync('./gitbook')) {
      console.log('Ya existe gitbook, sólo pulleo')
      pull().then(() => {
        generarGitbook().then(data => {
          res.send('Gitbook correctamente generado!');
        }).catch(err => {
          res.status(500).send('Error!!');
        })
        console.log('Pulleado correctamente!')
      });
    } else {
      console.log('No existe el gitbook, así que clono')
      clonar(req.body.repository.clone_url).then(() =>{
        git.cwd('./gitbook')
        generarGitbook().then(data => {
          res.send('Gitbook correctamente generado!');
        }).catch(err => {
          res.status(500).send('Error!!');
        })
        console.log('Clonado correctamente!')
      })
    }

  } else {
    res.status(403).send('Sólo puedes regenerar el gitbbok desde el webhook de github. Así que sólo pushea.')
  }
});

// Revisar si existe el directorio gitbook, si no crearlo.
function clonar(url) {
  return git.clone(url, __dirname + '/gitbook')
}
function pull(){
  return git.pull()
}

function generarGitbook () {
  return new Promise((resolve, reject) => {
    const gb = spawn('bash', ['generarGitbook.sh'])

    gb.stdout.on('data', data => process.stdout.write(data.toString()))
    gb.stderr.on('data', data => process.stderr.write(data.toString()))
    gb.on('close', code => code ? reject() : resolve())
  })
}

const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
