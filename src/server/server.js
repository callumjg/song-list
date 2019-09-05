const express = require("express");
const chalk = require("chalk");
const server = express();
const PORT = process.env.PORT || 3000;
const songsRouter = require("./routes/songs");
require("./db/mongoose");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/songs", songsRouter);

server.listen(PORT, () => {
	console.log(`Server listening on port ${chalk.green(PORT)}`);
});
