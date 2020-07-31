const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');
const { loginUser } = require('../../../Controllers/authController');
console.log(process.env.NODE_ENV);

describe('ok, Get users', () => {
  before((done) => {
    database
      .databaseConnect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    database
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Ok, login a user', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send({
        firstname: 'tigwggmothy',
        lastname: 'luggbanga',
        confirmPassword: 'smartjoker123',
        password: 'smartjoker123',
        email: 'agwaaambo@gmail.com',
      })
      .then((res) => {
        console.log(res.body);
        request(app)
          .get('/api/v1/users')
          .auth(res.body.token, { type: 'bearer' })
          .then((res) => {
            const body = res.body;
            done();
          });
      })

      .catch((err) => {
        done(err);
      });
  });
});
