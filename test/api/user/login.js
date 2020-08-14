const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');
const { databaseConnect } = require('../../../dbConnection');

describe('/POST/users/login authenticate a user', () => {
  before((done) => {
    database
      .databaseConnect()
      .then(() => {
        return database.clear();
      })
      .then(() => {
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

  describe(' integration test for registering and login a user', () => {
    it('should register a user', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send({
          firstname: 'tigwothy',
          lastname: 'luggbanga',
          role: 'admin',
          confirmPassword: 'smartjoker123',
          password: 'smartjoker123',
          email: 'agwaaamboer@gmail.com',
        })
        .then((res) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
    it(' should login successfully and provide a token', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          password: 'smartjoker123',
          email: 'agwaaamboer@gmail.com',
        })
        .then((res) => {
          const body = res.body;
          expect(res.status).equals(200);
          expect(body).to.have.a.property('token');
          expect(body).to.have.a.property('data');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it(' should provide username and password', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .then((res) => {
          expect(res.status).equals(404);
          expect(res.body.message).equals('please provide email or password');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it(' should display wrong password', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({ password: 'smartjoker123e', email: 'agwaaamboer@gmail.com' })
        .then((res) => {
          expect(res.status).equals(500);
          expect(res.body.message).equals('wrong password  or username');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it(' should not allow empty strong of inputs', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({ password: '', email: '' })
        .then((res) => {
          expect(res.status).equals(404);
          expect(res.body.message).equals('please provide email or password');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should display no user found', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send({
          password: 'smartjoker123sde3',
          email: 'agwtboer@gmail.com',
        })
        .then((res) => {
          expect(res.status).equals(404);
          expect(res.body.message).equals('no user found');
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });
});
