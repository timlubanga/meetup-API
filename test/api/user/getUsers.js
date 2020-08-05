const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');

describe('ok, Get users', () => {
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

  it('successfully gets all users', (done) => {
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
        request(app)
          .get('/api/v1/users')
          .auth(res.body.token, { type: 'bearer' })
          .then((res) => {
            const body = res.body;
            expect(200);
            expect(body.status).to.equal('success');
            expect(body.docs).length(1);

            return done();
          });
      })

      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
