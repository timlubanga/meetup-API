const Users = require('./Models/userModel');
const Meetups = require('./Models/meetupModel');
const fs = require('fs');
const { insertMany } = require('./Models/userModel');

let meetups = JSON.parse(
  fs.readFileSync(`${__dirname}/dev_data/meetup.json`, 'utf8')
);

const inserted = () => {
  Meetups.create(meetups)
    .then((el) => {
      console.log('all data saved to db');
    })
    .catch((err) => {
      console.log(err);
    });
};

// module.exports = inserted;
// const deleteMeetupData = () => {
//   Meetups.deleteMany({})
//     .then((el) => {
//       console.log('all data deleted');
//     })
//     .catch((err) => {
//       console.log('something went wrong');
//     });
// };

// module.exports = deleteMeetupData;

module.exports = inserted;
