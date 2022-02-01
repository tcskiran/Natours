const mongoose = require('mongoose');
const dotenv = require('dotenv');
const importDev = require("./dev-data/data/import-dev-data");

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
  .then(() => {
    console.log('DB connection successful')
    // console.log("type of importdata = ", typeof(importDev.importData))
    // importDev.importData();
    const exec = require('child_process').exec;
    const myShellScript = exec('sh database-import.sh');
    myShellScript.stdout.on('data', (data) => {
      console.log("Data import successful")
      console.log(data); 
    });
    myShellScript.stderr.on('data', (data) => {
      console.log("Data import error")
      console.error(data);
    });
    console.log('Import Connection successful')
  });

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
