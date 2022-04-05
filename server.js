require('dotenv').config({ path: '.env' });
// const dataDelete = require('./script');

//connect the application to the database
if (
  process.env.NODE_ENV == 'production' ||
  process.env.NODE_ENV == 'development'
) {
  require('./dbConnection')
    .databaseConnect()
    .then((msg) => {
      console.log(msg);
      // dataDelete();
    })
    .catch((err) => {
      console.log(`this is the error${err}`);
    });
}

const app = require('./app');
if (process.env.NODE_ENV == 'clearing') {
  const deleteData = require('./script');
  deleteData();
}

let port = 3000;
console.log(process.env.NODE_ENV);

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  port = port;
}
app.listen(port, () => {
  console.log(
    `the sever is running on port ${port}`
  );
});

module.exports = app;
