const Users = require('./Models/userModel');

const deleteData = () => {
  Users.deleteMany({})
    .then((el) => {
      console.log('all data deleted');
    })
    .catch((err) => {
      console.log('something went wrong');
    });
};

module.exports = deleteData;
