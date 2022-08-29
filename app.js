const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

var corsOptions = {
   origin: ['http://localhost:3000', 'https://kanban-typescript.vercel.app', 'https://expense-tracker-app-omega.vercel.app'],
   // origin: ,
   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}

const app = express();

app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', require('./src/v1/routes'));

app.get('/demo', async (req, res) => {
   try {
      res.send('Hello World');
   } catch (error) {
      res.status(500).send(error);
   }
})
module.exports = app;
