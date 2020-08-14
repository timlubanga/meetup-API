const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const databaseConnclr = require('../test_databaseConnectandClear');
const {
  adminRegister,
  adminlogin,
  userRegister,
  wronglogin,
  emptyLogin,
  NoUser,
} = require('../test_data/data');

describe('/POST/users/login authenticate a user', () => {
  databaseConnclr();
  describe(' integration test for registering and login a user', () => {
    it('should register a user', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(adminRegister)
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
        .send(adminlogin)
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
        .send(wronglogin)
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
        .send(emptyLogin)
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
        .send(NoUser)
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
