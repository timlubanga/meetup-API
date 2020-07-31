const mongoose = require('mongoose');

let ConnectString = `mongodb+srv://timlubs:${process.env.PASS}@cluster0-bry7y.mongodb.net/meetup?retryWrites=true&w=majority`;

const databaseConnect = () => {
  return new Promise(async (resolve, reject) => {
    if (process.env.NODE_ENV == 'testing') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = new MongoMemoryServer();
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
          if (err) return reject(err);

          resolve(res);
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
          console.log('database connected');
          resolve();
        });
    }
  });
};

const close = () => {
  return mongoose.disconnect();
};

module.exports = { databaseConnect, close };
