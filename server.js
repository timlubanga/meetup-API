require("dotenv").config({ path: "./env/config.env" });

const app = require("./app");
console.log(process.env.NODE_ENV)
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `the sever is running on port ${process.env.PORT} your mail is ${app.locals.email}`
  );
});
