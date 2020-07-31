const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');
console.log(process.env.NODE_ENV);

describe('Register a new users', () => {
  before((done) => {
    database
      .databaseConnect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    console.log('register done');
    database
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it('Ok, creating a new user', (done) => {
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
        const body = res.body;
        expect(body).to.be.an('object');
        expect(body).to.have.a.property('token');
        expect(body.data.email).to.equal('agwaaambo@gmail.com');
        done();
      })
      .catch((err) => done(err));
  });
});
