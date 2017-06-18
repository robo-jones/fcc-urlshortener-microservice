'use strict';

const validUrl = require('valid-url');
const shortid = require('shortid');
const mongodb = require('../config/mongodb.js');
const urlCollection = require('../config/env.js').collection;

const shortUrlRedirect = function(req, res) {
    const shortUrl = req.params.url;
    let connection = undefined;
    mongodb.open()
    .then((db) => {
        connection = db;
        return db.collection(urlCollection);
    })
    .then((urls) => {
        return urls.find({shortUrl : {$eq: shortUrl}}).toArray();
    })
    .then((result) => {
        if (result.length > 0) {
            res.redirect(result[0].originalUrl);
        } else {
            res.sendStatus(404);
        }
        connection.close();
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
};

const shortenUrl = function(req, res) {
    const originalUrl = req.originalUrl.slice(13);
    if (!validUrl.isWebUri(originalUrl)) {
        res.json({
            error: 'INVALID URL FORMAT'
        });
    } else {
        const shortUrl = shortid.generate();
        let connection = undefined;
        mongodb.open()
        .then((db) => {
            connection = db;
            return db.collection(urlCollection);
        })
        .then((urls) => {
            return urls.insert({
                originalUrl,
                shortUrl
            });
        })
        .then((result) => {
            res.json({shortUrl});
            connection.close();
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    }
};

module.exports = {
    shortUrlRedirect,
    shortenUrl
};