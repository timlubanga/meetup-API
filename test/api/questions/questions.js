const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const databaseConnandClr = require('../test_databaseConnectandClear');
const {
  adminRegister,
  newMeetup,
  userRegister,
  newQuestion,
  updateQuestionData,
} = require('../test_data/data');

describe('test post questions get question, update and delete functionality', () => {
  let adminToken = null;
  let userToken = null;
  let meetupid = null;
  questionid = null;
  databaseConnandClr();
  it('register a user, create a meetup and question', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(adminRegister)
      .then(async (res) => {
        adminToken = res.body.token;
        const data = await request(app)
          .post('/api/v1/users/register')
          .send(userRegister);
        userToken = data.body.token;

        const meetup = await request(app)
          .post('/api/v1/meetup')
          .send(newMeetup)
          .auth(adminToken, { type: 'bearer' });
        meetupid = meetup.body.data._id;
        done();
      })
      .catch((err) => done(err));
  });

  it('a user should successfully post a question', (done) => {
    request(app)
      .post(`/api/v1/meetup/${meetupid}/question`)
      .send(newQuestion)
      .auth(userToken, { type: 'bearer' })
      .then((question) => {
        questionid = question.body.data._id;
        expect(question.status).equals(201);
        expect(question.body.data.meetup).equals(meetupid);
        expect(question.body.data.title).equals(newQuestion.title);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('a user should successfully update   a question', (done) => {
    request(app)
      .patch(`/api/v1/question/${questionid}`)
      .send(updateQuestionData)
      .auth(userToken, { type: 'bearer' })
      .then((question) => {
        expect(question.body.title).equals(updateQuestionData.title);
        expect(question.status).equals(202);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('should deny a normal user from getting a question', (done) => {
    request(app)
      .get(`/api/v1/question`)
      .auth(userToken, { type: 'bearer' })
      .then((question) => {
        expect(question.body.message).equals(
          'Sorry, not allowed to access this endpoint'
        );
        expect(question.body.status).equals('fail');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('a user should successfully get total posted question', (done) => {
    request(app)
      .get(`/api/v1/question/totalquestionpostedByUser`)
      .auth(userToken, { type: 'bearer' })
      .then((question) => {
        expect(question.status).equals(200);
        expect(question.body.length).equals(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });

  it('a user should successfully delete a question', (done) => {
    request(app)
      .delete(`/api/v1/question/${questionid}`)
      .auth(userToken, { type: 'bearer' })
      .then((question) => {
        expect(question.status).equals(204);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
  });
});
