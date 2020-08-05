const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');
const { databaseConnect } = require('../../../dbConnection');

describe('ok, register a user', () => {
  before((done) => {
    database
      .databaseConnect()
      .then(() => {
        return database.clear();
      })
      .then((res) => {
        console.log(res);
        done();
      })
      .catch((err) => done(err));
  });

  after((done) => {
    database
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('successfully register a user with email password', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send({
        firstname: 'tigwggmothy',
        lastname: 'luggbanga',
        role: 'admin',
        confirmPassword: 'smartjoker123',
        password: 'smartjoker123',
        email: 'agwaaambo@gmail.com',
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('token');
        expect(body).to.be.an('object');
        return done();
      })

      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
