const express = require('express');

const app = express();

const userRouter = require('./Routes/userRoute');

// const rateLimiter = rateLimit({
//     max: 5000,
//     windowMs: 60 * 60 * 1000
//   });
//   app.use('/api', rateLimiter);
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//connect the application to the database
require('./dbConnection');

app.use('/api/v1/users', userRouter);

app.locals.email = 'timlubanga@gmail.com';

module.exports = app;
