const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');
const { adminRegister, userRegister } = require('../test_data/data');

describe('Admin should be able to acess user records', () => {
  let token = null;
  let data = null;
  before((done) => {
    database
      .databaseConnect()
      .then(() => {
        database.clear();
      })
      .then(() => {
        request(app)
          .post('/api/v1/users/register')
          .send(adminRegister)
          .then((res) => {
            token = res.body.token;
            request(app)
              .post('/api/v1/users/register')
              .send(userRegister)
              .then((res) => {
                data = res.body;
                done();
              })
              .catch((err) => done(err));
          });
      });
  });
  after((done) => {
    database
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  describe('/GET/users', () => {
    it('successfully gets all users', (done) => {
      request(app)
        .get('/api/v1/users')
        .auth(token, { type: 'bearer' })
        .then((res) => {
          const body = res.body;
          expect(200);
          expect(body.status).to.equal('success');
          expect(body.docs).length(2);

          return done();
        })

        .catch((err) => {
          console.log(err);
          done(err);
        });
    });

    it('successfully gets one user', (done) => {
      request(app)
        .get(`/api/v1/users/${data.data._id}`)
        .auth(token, { type: 'bearer' })
        .then((res) => {
          const body = res.body;
          expect(res.status).equals(200);
          expect(body).to.have.haveOwnProperty('records');

          return done();
        })

        .catch((err) => {
          console.log(err);
          done(err);
        });
    });

    describe('/PATCH, update details', () => {
      it('update a user record', (done) => {
        request(app)
          .patch(`/api/v1/users/${data.data._id}`)
          .auth(token, { type: 'bearer' })
          .send({
            email: 'timothy@gmail.com',
          })
          .then((res) => {
            expect(res.status).equals(202);
            expect(res.body.email).equals('timothy@gmail.com');
            done();
          })
          .catch((err) => {
            done(err);
          });
      });
    });

    describe('/DELETE, delete one user', () => {
      it('update a user record', (done) => {
        request(app)
          .delete(`/api/v1/users/${data.data._id}`)
          .auth(token, { type: 'bearer' })
          .then((res) => {
            expect(res.body.active).equals(false);
            expect(res.status).equals(202);
            expect(res.body.lastname).equals('simaloi');
            done();
          })
          .then(() => {
            it('it should display one record after one account was deleted', (done) => {
              request(app)
                .get('/api/v1/users')
                .auth(token, { type: 'bearer' })
                .then((res) => {
                  const body = res.body;
                  expect(200);
                  expect(body.status).to.equal('success');
                  expect(body.docs).length(1);

                  return done();
                })
                .catch((err) => {
                  done(err);
                });
            });
          })
          .catch((err) => {
            done(err);
          });
      });
    });
  });
});
