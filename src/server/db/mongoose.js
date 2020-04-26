const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports = async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (e) {
    console.log(chalk.red('Error, unable to connect to database'));
    console.log(e);
  }
};
