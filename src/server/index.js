const chalk = require("chalk");
const server = require("./server");
const connect = require("./db/mongoose");
const PORT = process.env.PORT || 3001;

connect();

server.listen(PORT, () =>
  console.log(`Server listening on port ${chalk.green(PORT)}`)
);
