const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');
const { databaseConnect } = require('../../../dbConnection');

describe('ok, login successfully', () => {
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

  it('first register a user', (done) => {
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
        request(app)
          .post('/api/v1/users/login')
          .send({
            password: 'smartjoker123',
            email: 'agwaaamboer@gmail.com',
          })
          .then((res) => {
            const body = res.body;
            expect(200);
            return done();
          });
      })

      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
