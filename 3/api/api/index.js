var express = require('express')
var app = express()
var request = require('request')
const Datastore = require('@google-cloud/datastore');
const PubSub = require('@google-cloud/pubsub')
var response = 'Hello World!'
var projName = process.env.PROJNAME || 'fauxpassproj-dev'
var topicName = process.env.TOPICNAME || 'chess-moves'
var nameSpace = process.env.NAMESPACE || 'testing'

// Your Google Cloud Platform project ID
const projectId = 'YOUR_PROJECT_ID';

// Creates a client
const datastore = new Datastore({
  projectId: projName,
});
const pubsub = new PubSub({
  projectId: projName
})

app.get('/', function (req, res) {
  res.send(response)
})

app.get('/login/:username', function (req, res) {
  const kind = 'User'
  const name = req.params.username
  const userKey = datastore.key([kind, name])

  datastore
    .get(userKey)
    .then((entity) => {
      if(entity[0] != undefined){
        res.status(200).send(`Entity exists ${entity[0].registered}`)
      }else{
        res.status(403).send(`User not registered`)
      }
    })
    .catch(err => {
      res.status(500).send(`Error checking for user in datastore`)
      console.error('ERROR:', err);
    });
})

app.get('/signup/:username', function (req, res) {
  const kind = 'User';
  const name = req.params.username
  const userKey = datastore.key([kind, name]);

  // Prepares the new entity
  const user = {
    key: userKey,
    data: {
      registered: true,
    },
  };

  // Saves the entity
  datastore
    .save(user)
    .then(() => {
      res.status(200).send(`Saved ${user.key.name}`)
      console.log(`Saved ${user.key.name}: ${user.data.registered}`);
      pubsub
        .topic(topicName)
        .publisher()
        .publish(Buffer.from(`Saved ${user.key.name}`))
        .then( messageID => {
          console.log(`Message published: ${messageID}`)
        })
        .catch(err => {
          console.error('ERROR:', err);
        });

    })
    .catch(err => {
      console.error('ERROR:', err);
    });
})

app.get('/move/:id', function (req, res) {
  request('http://chess:3000/', function (error, response, body) {
    console.dir(response.body)
    res.send(response.body)
  });
})

app.get('/auth/:id', function (req, res) {
  request('http://auth:3000/' + req.params.id, function (error, response, body) {
    console.log('To auth:' + response.body)
    res.json(JSON.parse(response.body))
  });
})

var server = null

/* istanbul ignore next */
function onListen() {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
}

/* istanbul ignore next */
if (module.parent) {
  module.exports = app
} else {
  server = app.listen(3000, onListen)
}