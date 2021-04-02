const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const database = require('../../../dbConnection');
const { adminRegister, newMeetup } = require('../test_data/data');

describe('admin should be able to create a meetup, update,delete, and find records', () => {
  let token = null;
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
          .send(adminRegister)
          .then((res) => {
            token = res.body.token;
            done();
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
      .send(newMeetup)
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
        category: 'careers & Business',
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
      .field('category', 'learning')
      .field('happeningOn', '9/21/2022')
      .attach('photos', 'public/meetup-photos/pf.jpeg')
      .then((data) => {
        console.log(data);
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
      .attach('photos', 'public/meetup-photos/pf.jpeg')
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

  it(' Delete/ deny permission of deleting a protected resource', (done) => {
    request(app)
      .delete(`/api/v1/meetup/${meetupid}`)
      .then((data) => {
        expect(data.body.Message).equals('no permission, please sign in');
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it(' Delete/ should be able to throw a delete error for invalid error', (done) => {
    request(app)
      .delete(`/api/v1/meetup/${12345689}`)
      .auth(token, { type: 'bearer' })
      .then((data) => {
        expect(data.status).equals(500);
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
