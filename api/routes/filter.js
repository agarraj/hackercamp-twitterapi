/*
* Author: Rajat Agarwal
*/


const express = require('express');
const router = express.Router();
var jsonexport = require('jsonexport');
var fs = require('fs');

//acquire database connection
const db = require('./dbConn');

// To print Json into csv file
function printJson(docs){
  jsonexport(docs,function(err, csv){
    if(err) return console.log(err);
    fs.writeFile('file.csv', csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
  });
}

// to search username
router.get('/username/', function(req,res,next){
  const startswith = req.query.startswith;
  const endswith = req.query.endswith;
  const contains = req.query.contains;
  const page  = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;

  if(startswith !=null ){
    var collection_users   = db.get().collection('users');
    collection_users.find({name : {$regex: "^"+startswith+".*"  , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(endswith !=null ){
    var collection_users   = db.get().collection('users');
    collection_users.find({name : {$regex: endswith+"$" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(contains !=null ){
    var collection_users   = db.get().collection('users');
    collection_users.find({name : {$regex: ".*" + contains + ".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
});

// to search screen_name of user
router.get('/screen_name/', function(req,res,next){
  const startswith = req.query.startswith;
  const endswith = req.query.endswith;
  const contains = req.query.contains;
  const page  = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;

  if(startswith !=null ){
    var collection_users   = db.get().collection('users');
    collection_users.find({screen_name : {$regex: "^"+startswith+".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(endswith !=null ){
    var collection_users   = db.get().collection('users');
    collection_users.find({screen_name : {$regex: endswith+"$" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);

    })
  }
  else if(contains !=null ){
    var collection_users   = db.get().collection('users');
    collection_users.find({screen_name : {$regex: ".*" + contains + ".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }

});

// to search tweet text
router.get('/tweettext/', function(req,res,next){
  const startswith = req.query.startswith;
  const endswith = req.query.endswith;
  const contains = req.query.contains;
  const page  = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;

  if( startswith !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({text : {$regex: "^"+startswith+".*"  , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);

    })
  }
  else if( endswith !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({text : {$regex: endswith+"$" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);

    })
  }
  else if( contains !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({text : {$regex: ".*" + contains + ".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
});
// to search urls in tweet


router.get('/urls/', function(req,res,next){
  const startswith = req.query.startswith;
  const endswith = req.query.endswith;
  const contains = req.query.contains;
  const page  = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;

  if(startswith !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({url : {$regex: "^"+startswith+".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(endswith !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({url : {$regex: endswith+"$" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(contains !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({url : {$regex: ".*" + contains + ".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
});


// to search user mentioned in tweet
router.get('/user_mentions/', function(req,res,next){
  const startswith = req.query.startswith;
  const endswith = req.query.endswith;
  const contains = req.query.contains;
  const page  = req.query.page;
  var skip = (page-1)*5;
  var lim = 5;

  if(startswith !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({user_mentions : {$regex: "^"+startswith+".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(endswith !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({user_mentions : {$regex: endswith+"$" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(contains !=null ){
    var collection_twitter   = db.get().collection('twitter');
    collection_twitter.find({user_mentions : {$regex: ".*" + contains + ".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
});


module.exports = router;
