var express = require('express')
var app = express()
var request = require('request')

var response = 'Hello World!'

app.get('/', function(req,res){
  res.send(response)
})

app.get('/:id', function (req, res) {
  request('http://auth:3000/'+req.params.id, function (error, response, body) {
    console.log(response.body)
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