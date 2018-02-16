/*
 * Author: Rajat Agarwal
 */

const express = require('express');
const app = express();
const morgan = require('morgan');//type of error handling
const bodyParser = require('body-parser');


//to get request query on console
app.use(morgan('dev'));
//to make json data easily readable
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//route to handle request
const searchKeywords = require('./api/routes/searchKeyword');
app.use('/searchKeyword', searchKeywords);

const searchTT = require('./api/routes/searchTT');
app.use('/searchTT', searchTT);

const filters = require('./api/routes/filter');
app.use('/filter', filters);

const counts = require('./api/routes/counts');
app.use('/counts', counts);

const datetime = require('./api/routes/datetime');
app.use('/datetime', datetime);

app.use(function(req,res,next){
  //return an error
  const error = new Error('NOT FOUND');
  error.status(404);
  next(error);
});

app.use(function(error, req, res, next){
  res.status(error.status || 500);
  res.json({
    error: {
      message : error.message
    }
  })
});

module.exports = app;
