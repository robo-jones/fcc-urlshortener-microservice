'use strict';

const express = require('express');
const urlRoutes = require('../routes/urls.routes.js');

let app = express();

app.use('/', urlRoutes);
app.use(express.static('./public'));

module.exports = app;