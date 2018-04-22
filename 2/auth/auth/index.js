var express = require('express')
var app = express()

var response = 'Auth response!'

app.get('/', function (req, res) {
  res.send(response)
})

app.get('/1', function (req, res) {
  res.status(200).send(JSON.stringify({ authenticated: true }))
})

app.get('/2', function (req, res) {
  res.status(200).send(JSON.stringify({ authenticated: false }))
})

var server = null

/* istanbul ignore next */
function onListen () {
  var host = server.address().address
  var port = server.address().port

  console.log('Auth service listening at http://%s:%s', host, port)
}

/* istanbul ignore next */
if(module.parent) {
  module.exports = app
} else {
  server = app.listen(3000, onListen)
}