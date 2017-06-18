'use strict';

const MongoClient = require('mongodb').MongoClient;
const env = require('./env.js');

const mongoDevSettings = {
    user: "urldev",
    password: "urldevpassword",
    host: process.env.IP,
    port: 27017,
    db: "url-shortener",
};

let dbUrl;
if (env.NODE_ENV === 'DEV') {
    dbUrl = 'mongodb://' + mongoDevSettings.user +
        ':' + mongoDevSettings.password +
        '@' + mongoDevSettings.host +
        ':' + mongoDevSettings.port +
        '/' + mongoDevSettings.db;
} else if (env.NODE_ENV === 'PRODUCTION') {
    dbUrl = 'mongodb://' + process.env.DB_USER +
        ':' + process.env.DB_PASSWORD +
        '@' + process.env.DB_HOST +
        ':' + process.env.DB_PORT +
        '/' + process.env.DB;
}

const open = function() {
    return MongoClient.connect(dbUrl);
};

module.exports = {
    open
};