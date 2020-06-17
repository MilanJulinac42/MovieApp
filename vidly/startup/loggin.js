const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.configure({
    transports: [new winston.transports.File({ filename: "logfile.log" })],
  });
};
