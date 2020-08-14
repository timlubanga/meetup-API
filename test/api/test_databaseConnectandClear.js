const database = require('../../dbConnection');

const databaseConnClr = () => {
  before((done) => {
    database
      .databaseConnect()
      .then(() => {
        return database.clear();
      })
      .then((res) => {
        done();
      })
      .catch((err) => done(err));
  });

  after((done) => {
    database
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });
};

module.exports = databaseConnClr;
