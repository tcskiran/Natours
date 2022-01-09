const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection succefull'));

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}.....`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandler Rejection');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
