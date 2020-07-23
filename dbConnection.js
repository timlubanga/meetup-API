const db = require('mongoose');

let ConnectString = `mongodb+srv://timlubs:${process.env.PASS}@cluster0-bry7y.mongodb.net/meetup?retryWrites=true&w=majority`;

db.connect(ConnectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    console.log('database connected successfully');
  })
  .catch(() => {
    console.log('database connection failed');
  });

// const conn = db.connection;
// conn.on("error", console.error.bind(console, "connection error:"));
// conn.once("open", function () {
//   console.log("database connected");
// });

module.exports = db;
