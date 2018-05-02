var supertest = require('supertest')
var app = require('../')
var tape = require('tape')

tape('Server returns Auth response!', function (t) {
  supertest(app)
    .get('/')
    .expect(200, 'Auth response!')
    .end(function (e) {
      t.error(e, 'Supertest checks pass')
      t.end()
    })
})

tape('Server returns authenticated response!', function (t) {
  supertest(app)
    .get('/1')
    .set('Accept', 'application/json')
    .expect(200, {authenticated:true})
    .end(function (e) {
      t.error(e, 'Supertest checks pass')
      t.end()
    })
})

tape('Server returns unauthenticated response!', function (t) {
  supertest(app)
    .get('/2')
    .set('Accept', 'application/json')
    .expect(200, {authenticated:false})
    .end(function (e) {
      t.error(e, 'Supertest checks pass')
      t.end()
    })
})