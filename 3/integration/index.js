var test = require('tape')
var supertest = require('supertest')
var net = require('net')
var async = require('async')

var api_host = process.env['API_HOST']
var api_port = process.env['API_PORT']
var api = `http://${api_host}:${api_port}`

test('Waiting for api to become available', function (t) {
  var client
  async.retry(function (cb) {
    t.comment(`Attempting to connect to ${api_host}:${api_port}...`)
    client = net.connect(api_port, api_host, cb)
  }, function (e) {
    t.error(e, 'api is available')
    if(e) throw e
    client.unref()
    client.end()
    t.end()
  })
})


function helloWorldTestBuilder (url) {
  return function helloWorldTest (t) {
    supertest(url)
      .get('/')
      .expect(200, 'Hello World!')
      .end(function(e) {
        t.error(e, 'API is reachable')
        t.end()
      })
  }
}

function apiReturnsAuthorized (url) {
    return function helloWorldTest (t) {
        console.log(url)
      supertest(url)
        .get('/auth/1')
        .set('Accept', 'application/json')
        .expect(200, {authenticated:true})
        .end(function(e) {
          t.error(e, 'Returns authorized')
          t.end()
        })
    }
  }

  function chessReturnsHelloWorld (url) {
    return function helloWorldTest (t) {
        console.log(url)
      supertest(url)
        .get('/move/1')
        .expect(200, 'Chess response!')
        .end(function(e) {
          t.error(e, 'Chess response valid')
          t.end()
        })
    }
  }

test('Test producer', helloWorldTestBuilder(api))
test('Test authentication', apiReturnsAuthorized(api))
test('Chess is live', chessReturnsHelloWorld(api))