require('dotenv').config({ path: './env/config.env' });

//connect the application to the database
if (process.env.NODE_ENV == 'production' || 'development') {
  const dbConnect = require('./dbConnection').databaseConnect();
}

const app = require('./app');
if (process.env.NODE_ENV == 'clearing') {
  const deleteData = require('./script');
  deleteData();
}
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `the sever is running on port ${process.env.PORT} your mail is ${app.locals.email}`
  );
});

module.exports = app;
