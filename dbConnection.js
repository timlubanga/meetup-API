const db = require("mongoose");

let ConnectString = `mongodb+srv://timlubs:${process.env.PASS}@cluster0-bry7y.mongodb.net/meetup?retryWrites=true&w=majority`;

db.connect(ConnectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const conn = db.connection;
conn.on("error", console.error.bind(console, "connection error:"));
conn.once("open", function () {
  console.log("database connected");
});

module.exports = db;
