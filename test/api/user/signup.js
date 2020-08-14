const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');

const {
  adminRegister,
  invaliUserdEmail,
  UserinvalidPassword,
  userRequiredField,
} = require('../test_data/data');
const databaseConnClr = require('../test_databaseConnectandClear');

describe('/POST/register', () => {
  databaseConnClr();
  it('successfully register a user with email password', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(adminRegister)
      .then((res) => {
        const body = res.body;
        expect(body).to.have.property('token');
        expect(body).to.be.an('object');
        done();
      })

      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it('check invalid mailerror', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(invaliUserdEmail)
      .then((res) => {
        expect(res.status).equals(400);
        expect(res.body.status).equals('fail');
        expect(res.body.message).equals(
          'ValidationError: email: please provide a valid email address'
        );

        done();
      })

      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it('check for input validation', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(UserinvalidPassword)
      .then((res) => {
        expect(res.status).equals(400);
        expect(res.body.status).equals('fail');
        expect(res.body.message).equals(
          'ValidationError: confirmPassword: The passwords are not the same'
        );
        done();
      })

      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('check for input validation, validates required fields', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userRequiredField)
      .then((res) => {
        expect(res.status).equals(400);
        expect(res.body.status).equals('fail');
        expect(res.body.message).equals(
          'ValidationError: confirmPassword: please confirm your password, lastname: Please provide your name'
        );
        done();
      })

      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
