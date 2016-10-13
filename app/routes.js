const Git = require('simple-git')
const fs = require('fs')
const express = require('express')
const path = require('path')
const router = express.Router();
const { clonar, pull, generarGitbook } = require('./functions')

router.use('/health', (req, res) => {
  res.sendStatus(200)
})

router.post('*', (req, res) => {
  if (!/GitHub-Hookshot/.test(req.headers['user-agent'])) {
    console.log('no tienes permisos');
    return res.status(403).send('Sólo puedes regenerar el gitbook desde el webhook de github. Así que sólo pushea.')
  }

  fs.existsSync(path.resolve(__dirname, 'gitbook')) ? pullYGenerar(req, res) : clonarYGenerar(req, res)
});

function pullYGenerar (req, res) {
  pull().then(() => {
    generarGitbook().then(data => {
      res.send('Gitbook correctamente generado!');
    }).catch(err => {
      res.status(500).send('Error!!');
    })
  });
}

function clonarYGenerar(req, res) {
  clonar(req.body.repository.clone_url).then(() =>{
    generarGitbook().then(data => {
      res.send('Gitbook correctamente generado!');
    }).catch(err => {
      res.status(500).send('Error!!');
    })
  })
}

router.use(express.static(path.resolve(__dirname, 'gitbook/_book')));

module.exports = router