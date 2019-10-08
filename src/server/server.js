const express = require("express");
const chalk = require("chalk");
const server = express();
const PORT = process.env.PORT || 3001;
const apiRouter = require("./routes/api");

require("./db/mongoose");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/v1", apiRouter);

server.listen(PORT, () => {
	console.log(`Server listening on port ${chalk.green(PORT)}`);
});
