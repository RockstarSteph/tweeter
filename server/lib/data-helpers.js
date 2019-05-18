"use strict";

// Simulates the kind of delay we see with network or filesystem operations
//const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
    //  simulateDelay(() => {
        //db.tweets.push(newTweet);
       db.collection("tweets")
      .insertOne(newTweet)
      .then(function (){
        callback(null)});
      //});
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      //simulateDelay(() => {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweets").find()
      .toArray()
      .then((result)=> {
        callback(null, result.sort(sortNewestFirst));
      })

      //(tweets => res.jason(tweets));

      //callback(null, db.tweets.sort(sortNewestFirst));
    }
  }
};

  //  // ==> Let's "get all the tweets". In Mongo-speak, we "find" them.
  // db.collection("tweets").find({}, (err, result) => {
  //   // Lazy error handling:
  //   if (err) throw err;

  //  // ==> Fair warning: This is going to log a lot of stuff...
  //   //console.log("find result: ", result);
  //   //console.log("type of find result: ", typeof result);


  // db.close();
  // }).toArray()
  // .then(tweets => res.jason(tweets));