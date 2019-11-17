const axios = require("axios");
const server = axios.create({
  baseURL: "/api/v1"
});

module.exports = server;
