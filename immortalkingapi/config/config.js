require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
    DB_HOST: process.env.DB_HOST,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
}