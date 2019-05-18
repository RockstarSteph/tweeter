"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

//*** adding MongoDB, MongoClient is the server *********
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
//***** no longer needed coz now real DB with Mongo*****
//const db = require("./lib/in-memory-db");

let db = null;

MongoClient.connect(MONGODB_URI, (err, MongoDb) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  db = MongoDb;
  // we have a connection to the tweets DB here
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  console.log(db)


// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:


// ******************LINK BETWEEN DB & SERVER + LINK BETWEEN 2 different parts of server (the variables DataHelpers & TweeRoutes) ************************************************
// in the variable DataHelpers is stored SaveTweets & GetTWeets
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.

// ******************LINK BETWEEN BROWSER(client) & SERVER + LINK BETWEEN 2 different parts of server (the variables DataHelpers & TweeRoutes) ************************************************
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

// app.post ("/tweets", function (req, res){
//   const tweet = req.body.text;
//   res.end("");
// })

