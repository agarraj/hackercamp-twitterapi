/*
* Author: Rajat Agarwal
*/

const express = require('express');
const router = express.Router();

//acquire database connection
const db = require('./dbConn');

var jsonexport = require('jsonexport');
var fs = require('fs');


// To Print Json into file.csv
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
  const username  = req.query.username;
  const tweettext = req.query.tweettext;
  const screen_name  = req.query.screen_name;
  const language  = req.query.language;
  const page  = req.query.page;


  var skip = (page-1)*5;
  var lim = 5;
  if(username != null){
    var collection_users   = db.get().collection('users');
    console.log("salsn");
    collection_users.find({name : {$regex: ".*" + username + ".*" , $options: "ix" }}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(tweettext != null){
    decodeURI(tweettext); //to remove %20 and replace with space

    var collection_twitter = db.get().collection('twitter');
    collection_twitter.find({text : {$regex: ".*" + tweettext + ".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(screen_name != null){
    var collection_users   = db.get().collection('users');
    collection_users.find({screen_name : {$regex: ".*" + screen_name + ".*" , $options: "ix" }}).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
  else if(language != null){
    decodeURI(tweettext); //to remove %20 and replace with space

    var collection_twitter = db.get().collection('twitter');
    collection_twitter.find({language : {$regex: ".*" + language + ".*" , $options: "ix" } }).skip(skip).limit(lim).toArray().then(function (docs){
      printJson(docs);
      res.send(docs);
    })
  }
});

module.exports = router;
