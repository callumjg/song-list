const express = require("express");
const chalk = require("chalk");
const server = express();
const PORT = process.env.PORT || 3000;
require("./db/mongoose");

server.get("*", (req, res) => {
	res.send("it works");
});

server.listen(PORT, () => {
	console.log(`Server listening on port ${chalk.green(PORT)}`);
});
