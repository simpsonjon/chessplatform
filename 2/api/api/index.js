var express = require('express')
var app = express()
var request = require('request')

var response = 'Hello World!'

app.get('/', function(req,res){
  res.send(response)
})

app.get('/move/:id', function (req, res) {
  request('http://chess:3000/', function (error, response, body) {
    console.dir(response.body)
    res.send(response.body)
  });
})

app.get('/auth/:id', function (req, res) {
  request('http://auth:3000/'+req.params.id, function (error, response, body) {
    console.log('To auth:' + response.body)
    res.json(JSON.parse(response.body))
  });
})

var server = null

/* istanbul ignore next */
function onListen () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
}

/* istanbul ignore next */
if(module.parent) {
  module.exports = app
} else {
  server = app.listen(3000, onListen)
}