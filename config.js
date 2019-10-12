'use strict';

// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    db_host: process.env.DB_HOST,
    db_user: process.env.DB_USER,
    db_password: process.env.DB_PASSWORD,
    api_host: process.env.API_HOST,
    api_port: process.env.API_PORT
};
