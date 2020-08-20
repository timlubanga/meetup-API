const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../server');
const databaseConnandClr = require('../test_databaseConnectandClear');
const {
  userRegister,
  newMeetup,
  adminRegister,
  newQuestion,
} = require('../test_data/data');

describe('user should be able to upvote and downvote a question', () => {
  let usertoken = null;
  let admintoken = null;
  let questionid = null;
  let questionidTwo = null;
  let meetupid = null;
  let voteId = null;
  databaseConnandClr();

  it('should create a question to be upvoted or downvoted', (done) => {
    request(app)
      .post('/api/v1/users/register')
      .send(userRegister)
      .then((user) => {
        usertoken = user.body.token;
      })
      .then(async () => {
        const admin = await request(app)
          .post('/api/v1/users/register')
          .send(adminRegister);
        admintoken = admin.body.token;
        const meetup = await request(app)
          .post('/api/v1/meetup')
          .send(newMeetup)
          .auth(admintoken, { type: 'bearer' });
        meetupid = meetup.body.data._id;

        const question = await request(app)
          .post(`/api/v1/meetup/${meetupid}/question`)
          .send(newQuestion)
          .auth(usertoken, { type: 'bearer' });
        questionid = question.body.data._id;

        const questionTwo = await request(app)
          .post(`/api/v1/meetup/${meetupid}/question`)
          .send(newQuestion)
          .auth(usertoken, { type: 'bearer' });
        questionidTwo = questionTwo.body.data._id;

        done();
      });
  });

  it('should reject upvoting an invalid question', (done) => {
    request(app)
      .post(`/api/v1/question/questionId/votes/upvote`)
      .auth(usertoken, { type: 'bearer' })
      .then((vote) => {
        expect(vote.body.message).equals('please enter a valid questionId');
        expect(vote.body.status).equals('fail');
        done();
      })
      .catch((err) => done(err));
  });

  it('should upvote a valid question', (done) => {
    request(app)
      .post(`/api/v1/question/${questionid}/votes/upvote`)
      .auth(usertoken, { type: 'bearer' })
      .then((vote) => {
        voteId = vote.body.data._id;
        expect(vote.status).equals(201);
        expect(vote.body.data.question).equals(questionid);
        expect(vote.body.data.option).equals('upvote');
        done();
      })
      .catch((err) => done(err));
  });

  it('should reject upvoting an already voted valid question', (done) => {
    request(app)
      .post(`/api/v1/question/${questionid}/votes/upvote`)
      .auth(usertoken, { type: 'bearer' })
      .then((vote) => {
        expect(vote.body.status).equals('fail');
        expect(vote.body.message).equals('please note that you already voted');
        done();
      })
      .catch((err) => done(err));
  });

  it('should reject downvoting an already voted valid question', (done) => {
    request(app)
      .post(`/api/v1/question/${questionid}/votes/downvote`)
      .auth(usertoken, { type: 'bearer' })
      .then((vote) => {
        expect(vote.body.status).equals('fail');
        expect(vote.body.message).equals('please note that you already voted');
        done();
      })
      .catch((err) => done(err));
  });

  it('should downvote  valid unique question', (done) => {
    request(app)
      .post(`/api/v1/question/${questionidTwo}/votes/downvote`)
      .auth(usertoken, { type: 'bearer' })
      .then((vote) => {
        expect(vote.body.data.question).equals(questionidTwo);
        expect(vote.body.data.option).equals('downvote');
        expect(vote.body.status).equals('201');
        done();
      })
      .catch((err) => done(err));
  });

  it('should get all votes', (done) => {
    request(app)
      .get(`/api/v1/vote`)
      .auth(admintoken, { type: 'bearer' })
      .then((vote) => {
        expect(vote.status).equals(200);
        expect(vote.body.docs.length).equals(2);
        done();
      })
      .catch((err) => done(err));
  });

  it('should throw an error with a wrong voteid', (done) => {
    request(app)
      .delete(`/api/v1/vote/${questionid}`)
      .auth(admintoken, { type: 'bearer' })
      .then((vote) => {
        expect(vote.body.message).equals('please provide a valid id');
        expect(vote.body.status).equals('fail');
        expect(vote.status).equals(404);
        done();
      })
      .catch((err) => done(err));
  });

  it('should sucessfully delete a vote', (done) => {
    request(app)
      .delete(`/api/v1/vote/${voteId}`)
      .auth(admintoken, { type: 'bearer' })
      .then((vote) => {
        expect(vote.status).equals(204);
        done();
      })
      .catch((err) => done(err));
  });
});
