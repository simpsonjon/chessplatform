var supertest = require('supertest')
var app = require('../')
var tape = require('tape')

tape('Server returns Chess response!', function (t) {
  supertest(app)
    .get('/')
    .expect(200, 'Chess response!')
    .end(function (e) {
      t.error(e, 'Supertest checks pass')
      t.end()
    })
})