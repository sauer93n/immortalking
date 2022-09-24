require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
    DB_HOST: process.env.DB_HOST,
}