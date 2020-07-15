require('dotenv').config({ path: './env/config.env' });
const deleteData = require('./script');

const app = require('./app');
if ((process.env.NODE_ENV == 'clearing')) {
  deleteData();
}
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `the sever is running on port ${process.env.PORT} your mail is ${app.locals.email}`
  );
});
