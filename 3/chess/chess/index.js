var express = require('express')
var PubSub = require('@google-cloud/pubsub');
var app = express()

var response = 'Chess response!'
var projName = process.env.PROJNAME || 'fauxpassproj-dev'
var subscriptionName = process.env.SUBNAME || 'moves'

var pubsub = new PubSub({
  projectId: projName,
  keyFilename: '/secret/chess-key.json'
})
/** 
 * Handle pubsub message pulling and ACKs
 */
// References an existing subscription

const subscription = pubsub.subscription(subscriptionName);

// Create an event handler to handle messages
let messageCount = 0;
const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${message.attributes}`);
  messageCount += 1;

  // "Ack" (acknowledge receipt of) the message
  message.ack();
};
// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received.`);
}, 600000);

/**
 * Handle Endpoint for service
 */

app.get('/', function (req, res) {
  res.send(response)
})

var server = null

/* istanbul ignore next */
function onListen() {
  var host = server.address().address
  var port = server.address().port

  console.log('Chess service listening at http://%s:%s', host, port)
}

/* istanbul ignore next */
if (module.parent) {
  module.exports = app
} else {
  server = app.listen(3000, onListen)
}