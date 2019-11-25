const express = require("express");
const chalk = require("chalk");
const path = require("path");
const server = express();
const PORT = process.env.PORT || 3001;
const apiRouter = require("./routes/api");
const root = path.resolve(__dirname, "/dist");

require("./db/mongoose")();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/api/v1", apiRouter);

server.use(express.static("dist"));
server.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${chalk.green(PORT)}`);
});
