const mongoose = require("mongoose");
const chalk = require("chalk");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    console.log("Connected to database");
  } catch (e) {
    console.log(chalk.red("Error, unable to connect to database"));
    console.log(e);
  }
}

connect();
