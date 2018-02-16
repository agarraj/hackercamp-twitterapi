/*
* Author: Rajat Agarwal
*/


const express = require('express');
const router = express.Router();

//acquire database connection
const db = require('./dbConn');

var jsonexport = require('jsonexport');
var fs = require('fs');


// To Print Json into (file.csv)
function printJson(docs){
  jsonexport(docs,function(err, csv){
    if(err) return console.log(err);
    fs.writeFile('file.csv', csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
  });
}

// To sort according to date in ascending order
router.get('/sort_asc', function(req,res,next){
  const page  = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;

  var collection_twitter = db.get().collection('twitter');
  collection_twitter.find().sort({created_at: 1}).skip(skip).limit(lim).toArray().then(function (docs){
    printJson(docs);
    res.send(docs);

  })
});

// To sort according to date in descending order
router.get('/sort_desc', function(req,res,next){
  const page  = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;
  var collection_twitter = db.get().collection('twitter');
  collection_twitter.find().sort({created_at: -1}).skip(skip).limit(lim).toArray().then(function (docs){
    printJson(docs);
    res.send(docs);

  })
});

module.exports = router;
