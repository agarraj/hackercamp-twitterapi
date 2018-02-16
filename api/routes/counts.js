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

router.get('/', function(req,res,next){
  const retweet_count      = req.query.retweet_count;
  const favorite_count     = req.query.favorite_count;
  const userfollower_count = req.query.userfollower_count;
  var comparator           = req.query.comparator;
  const page               = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;

  //retweet_count less than , greater than, equal to
  if(retweet_count != null && comparator != null){
    var collection_twitter = db.get().collection('twitter');
    if(comparator == "eq")
    collection_twitter.find({retweet_count : {$eq : parseInt(retweet_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
    else if(comparator == "lt")
    collection_twitter.find({retweet_count : {$lt : parseInt(retweet_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
    else if(comparator == "gt")
    collection_twitter.find({retweet_count : {$gt : parseInt(retweet_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }


  //favorite_count less than , greater than, equal to
  if(favorite_count != null && comparator != null){
    var collection_twitter = db.get().collection('twitter');
    if(comparator == "eq")
    collection_twitter.find({favourite_count : {$eq : parseInt(favorite_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
    else if(comparator == "lt")
    collection_twitter.find({favourite_count : {$lt : parseInt(favorite_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
    else if(comparator == "gt")
    collection_twitter.find({favourite_count : {$gt : parseInt(favorite_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }


  //follower_count less than , greater than, equal to
  if(userfollower_count != null && comparator != null){
    var collection_users = db.get().collection('users');
    if(comparator == "eq")
    collection_users.find({followers_count : {$eq : parseInt(userfollower_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
    else if(comparator == "lt")
    collection_users.find({followers_count : {$lt : parseInt(userfollower_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
    else if(comparator == "gt")
    collection_users.find({followers_count : {$gt : parseInt(userfollower_count)}}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
});


module.exports = router;
