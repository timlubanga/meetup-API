require('dotenv').config({ path: './env/config.env' });

//connect the application to the database
if (
  process.env.NODE_ENV == 'production' ||
  process.env.NODE_ENV == 'development'
) {
  require('./dbConnection')
    .databaseConnect()
    .then((msg) => {
      console.log(msg);
    })
    .catch((err) => {
      console.log(err);
    });
}

const app = require('./app');
if (process.env.NODE_ENV == 'clearing') {
  const deleteData = require('./script');
  deleteData();
}

let port = 0;
console.log(process.env.NODE_ENV);

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  port = process.env.PORT || 3000;
}
// app.listen(port, () => {
//   console.log(
//     `the sever is running on port ${port} your mail is ${app.locals.email}`
//   );
// });

module.exports = app;
