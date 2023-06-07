'use strict';
var express = require('express');
const cors = require('cors');

var corsOptions = {
    origin: 'https://localhost:3001',
}

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var products = require('./routes/products');
var users = require('./routes/users');
var sellers = require('./routes/sellers');
var transactions = require('./routes/transactions');
var app = express();

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', users);
app.use('/transactions', transactions);
app.use('/sellers', sellers);
app.use('/products', products);

module.exports = app;
