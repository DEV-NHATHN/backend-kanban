const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

var corsOptions = {
   origin: ['http://localhost:3000', 'https://m2-ecommerce-shop-tahn-0102.vercel.app'],
   // origin: ,
   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}

const app = express();

// app.use(cors(corsOptions))
app.options('*', cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', require('./src/v1/routes'));

module.exports = app;
