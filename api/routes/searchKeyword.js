/*
* Author: Rajat Agarwal
*/


const express = require('express');
const router = express.Router();
//acquire database connection
const db = require('./dbConn');

//twitter connection
var Twit = require('twit');
var config = require('./config');
var T = new Twit(config);


let updateDb = function(res, id, dataAdd){

  T.get('search/tweets', { q: id, count: 50 }, function(err, data, response) {
    var jsonArr  = [];
    var jsonUser = [];
    var mentions = [];
    var urls     = [];

    for(var i=0 ; i<data['statuses'].length ; i++){
      for(var j=0 ; j< data['statuses'][i]['entities']['user_mentions'].length ; j++){
        mentions.push(
          data['statuses'][i]['entities']['user_mentions'][j]['name']
        );
      }

      for(var j=0 ; j< data['statuses'][i]['entities']['urls'].length ; j++){
        urls.push(
          data['statuses'][i]['entities']['urls'][j]['expanded_url'],
        );
      }

      dataAdd(data, jsonArr, jsonUser ,i, mentions, urls);

    }


    res.status(200).json({
      message:"ADDING KEY",
      keyname :id,
      data : jsonArr,
      user : jsonUser
    });


    var collection_users   = db.get().collection('users');
    var collection_twitter = db.get().collection('twitter');

    for(var noOfQuery = 0; noOfQuery < jsonUser.length; noOfQuery++ ){
      collection_users.insert(jsonUser[noOfQuery]);
      collection_twitter.insert(jsonArr[noOfQuery]);
    }




  });
}

//callback function for updateDb
function dataAdd(data, jsonArr, jsonUser ,i ,mentions, urls){
  jsonArr.push({
    _id : data['statuses'][i]['id'],
    created_at : data['statuses'][i]['created_at'],
    text : data['statuses'][i]['text'],
    //  created_at :
    user : data['statuses'][i]['user']['id'],
    retweet_count : data['statuses'][i]['retweet_count'],
    favourite_count : data['statuses'][i]['favorite_count'],
    user_mentions : mentions,
    url : urls,
    language : data['statuses'][i]['lang']
  });

  jsonUser.push({
    _id : data['statuses'][i]['user']['id'],
    name : data['statuses'][i]['user']['name'],
    screen_name : data['statuses'][i]['user']['screen_name'],
    followers_count : data['statuses'][i]['user']['followers_count'],
    user_favourite_count : data['statuses'][i]['favourites_count'],
  });
}


router.get('/:AddKey', function(req,res,next){
  const id = req.params.AddKey;
  console.log("searching");
  updateDb(res,id,dataAdd);
  console.log(db);


})

module.exports = router;
