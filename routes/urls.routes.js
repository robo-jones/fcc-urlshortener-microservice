'use strict';

const router = require('express').Router();
const urls = require('../controllers/urls.controller.js');

router.get('/:url', function(req, res) {
    urls.shortUrlRedirect(req, res);
});

router.get('/api/shorten/*', function(req, res) {
    urls.shortenUrl(req, res);
});

router.get('/', function(req, res) {
    res.send('Hello, World!');
});
module.exports = router;