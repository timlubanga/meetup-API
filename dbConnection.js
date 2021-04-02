const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();

let ConnectString = `mongodb+srv://timlubs:${process.env.PASS}@cluster0-bry7y.mongodb.net/meetup?retryWrites=true&w=majority`;

const databaseConnect = () => {
  return new Promise(async (resolve, reject) => {
    if (process.env.NODE_ENV == 'testing') {
      const uri = await mongod.getUri();
      const port = await mongod.getPort();
      const dbPath = await mongod.getDbPath();
      const dbName = await mongod.getDbName();
      mongoose
        .connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then((res, err) => {
          if (err) reject(err);

          resolve('connected bitches');
        });
    } else {
      mongoose
        .connect(ConnectString, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
        
          resolve('database connected');
        });
    }
  });
};

const close = () => {
  return mongoose.disconnect();
};

const clear = () => {
  return mongoose.connection.dropDatabase();
};

module.exports = { databaseConnect, clear, close };
