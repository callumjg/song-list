const express = require("express");
const path = require("path");
const expressStaticGzip = require("express-static-gzip");
const server = express();
const apiRouter = require("./routes/api");
const buildPath = path.join(__dirname, "../../dist");

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  expressStaticGzip(buildPath, { enableBrotli: true, orderPreference: ["br"] })
);

// Routes
server.use("/api/v1", apiRouter);
server.use(express.static(path.resolve(__dirname, "dist")));
server.use((req, res) => res.sendFile(buildPath + "/index.html"));

module.exports = server;
