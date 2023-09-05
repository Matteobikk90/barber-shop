const dotenv = require("dotenv").config().parsed;

module.exports = {
    HOST: "localhost",
    USER: dotenv.USER,
    PASSWORD: dotenv.PASSWORD,
    DB: "blendon_booking",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
