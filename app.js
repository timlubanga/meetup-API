const AppError = require('./utils/appError');
const express = require('express');
const errorHandler = require('./Controllers/errorHandleController');
const app = express();
const userRouter = require('./Routes/userRoute');
const meetupRouter = require('./Routes/meetupRoute');
const questionRouter = require('./Routes/questionRoute');
const voteRouter = require('./Routes/voteRoute');
const rsvpRouter = require('./Routes/rsvpRoute');
const cors = require('cors');

// const rateLimiter = rateLimit({
//     max: 5000,
//     windowMs: 60 * 60 * 1000
//   });
//   app.use('/api', rateLimiter);
app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/meetupfrontend/public`));

// //connect the application to the database
// require('./dbConnection');

app.use('/api/v1/users', userRouter);
app.use('/api/v1/meetup', meetupRouter);
app.use('/api/v1/question', questionRouter);
app.use('/api/v1/vote', voteRouter);
app.use('/api/v1/rsvp', rsvpRouter);

app.all('*', (req, res, next) => {
  const err = new AppError('This endpoint is not available', 404);
  next(err);
});

app.use(errorHandler);

app.locals.email = 'timlubanga@gmail.com';

module.exports = app;
