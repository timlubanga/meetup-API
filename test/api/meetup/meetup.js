const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');

describe('admin should be able to create a meetup, update,delete, and find records', () => {
  let token = null;
  let data = null;
  let meetupid = null;
  before((done) => {
    database
      .databaseConnect()
      .then(() => {
        database.clear();
      })
      .then(() => {
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
            token = res.body.token;
            request(app)
              .post('/api/v1/users/register')
              .send({
                firstname: 'ann',
                lastname: 'simaloi',
                role: 'user',
                confirmPassword: 'smartjoker123',
                password: 'smartjoker123',
                email: 'ann@gmail.com',
              })
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
  it('add should successfully post a meetup', (done) => {
    request(app)
      .post('/api/v1/meetup')
      .auth(token, { type: 'bearer' })
      .send({
        topic: 'React Native for 2020',
        happeningOn: '8/21/2020',
      })
      .then((data) => {
        expect(data.body.status).equals('201');
        expect(data.body.data.topic).equals('React Native for 2020');
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it(' should get a validation err if the admin adds an invalid data', (done) => {
    request(app)
      .post('/api/v1/meetup')
      .auth(token, { type: 'bearer' })
      .send({
        topic: 'React Native for 2020',
        happeningOn: '4/21/2020',
      })
      .then((data) => {
        expect(data.body.err.message).equals(
          'Meetup validation failed: happeningOn: please choose a valid date'
        );
        expect(data.status).equal(500);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it(' POST/ should be able to attach images and multidata', (done) => {
    request(app)
      .post('/api/v1/meetup')
      .auth(token, { type: 'bearer' })
      .field('topic', 'React Native for 2020')
      .field('happeningOn', '9/21/2020')
      .attach('photos', 'public/meetup-photos/photo-1595376739905-1.jpeg')
      .then((data) => {
        meetupid = data.body.data._id;
        expect(data.body.data['images'].length).equals(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it(' PATCH/ should be able to update the image array of the meetup', (done) => {
    request(app)
      .patch(`/api/v1/meetup/${meetupid}`)
      .auth(token, { type: 'bearer' })
      .field('topic', 'React Native and flutter for 2020')
      .attach('photos', 'public/meetup-photos/photo-1595376739905-1.jpeg')
      .then((data) => {
        expect(data.body.images.length).equals(2);
        expect(data.status).equals(202);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it(' GET/ should be able to get one meetup record', (done) => {
    request(app)
      .get(`/api/v1/meetup/${meetupid}`)
      .auth(token, { type: 'bearer' })
      .then((data) => {
        expect(data.body.records._id).equals(meetupid);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it(' Delete/ should be able to delete  the meetup', (done) => {
    request(app)
      .delete(`/api/v1/meetup/${meetupid}`)
      .auth(token, { type: 'bearer' })
      .then((data) => {
        expect(data.status).equals(204);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
