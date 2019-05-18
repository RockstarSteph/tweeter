/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// this is the path to my url address
const tweetObj = '/tweets';

//*************The following tweetObj was used as tests before implementing MongoDB, kept for testing purposes**********

// const tweetObj =
// [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ]

//**** The following Html test tweet along with the above db tests were used to create structure for new tweets *****

      // <section id="tweet-container">

      //   <article class= "posted-tweet">
      //     <header>
      //       <img src = "smiley.gif" alt= "User Pic">
      //       <span class="username"> username </span>
      //       <span class="at-username"> @username </span>
      //      </header>
      //     <p> Hello! This is a tweet! I'm new to this app. Please tell me more about it. Thank you. Goodbye. </p>
      //     <footer> time marker - 10 days ago </footer>
      //   </article>

      // </section>



// structure for new tweets

function createTweetElement(tweetObj){



  let $tweet = $('<article>').addClass('posted-tweet');
  console.log(tweetObj);

  const $header = $('<header>');

  const $headerImg = $('<img>').attr('src', tweetObj.user.avatars.small);

  const $username =$('<span>').addClass('username').text(tweetObj.user.name);

  const $handler = $('<span>').addClass('at-username').text(tweetObj.user.handle);

  const $usertext = $('<p>').text(tweetObj.content.text);

  let theDate = new Date(tweetObj.created_at);
  let postHowLongAgo = moment(theDate).fromNow();
  const $footer = $('<footer>').text(postHowLongAgo);






  $header.append($headerImg).append($username).append($handler);
  $tweet.append($header);
  $tweet.append($usertext);
  $tweet.append($footer);



  return $tweet;

  //******this is ultimately what I want to return as the new tweet:
  //return $tweet;
}

//console.log(createTweetElement(tweetObj));



// calls createTweetElement for each tweet
// takes return value and prepends it to the tweets container

function renderTweets(tweets) {
  // loops through tweets

  for (let oneTweet of tweets) {
    //console.log(oneTweet);
    //const $tweetArr = tweets[oneTweet];
    const $tweetEl = createTweetElement(oneTweet);
    //console.log('hey',$tweetEl)

    $('#tweet-container').prepend($tweetEl);


  // test code for one object in my array of objs, it works!
  // const $tweetArr = tweets[0];
  // const $myElements = $('tweet-container').append($tweetArr);
  // return $myElements;


  }
};


//*********** WILL NEED TO RENDER new post submission to see the new post with the rest of the tweets**********

// Ajax post request

const request = url => {
  let OneUserFormDataString = $(".new-tweet form").serialize();

//***** Html structure for form / tweet composing***

          // <form method = "POST" action="/tweets">
          //   <textarea name="text" placeholder="What are you humming about?"></textarea>
          //     <input type="submit" value="Tweet">
          //       <span class="counter">140</span>
          // </form>


//**** to create the alert without html structure in html file ****
//const $myAlert = $('<span>').addClass('alertPop').text();
// const $myAlert = $('.new-tweet form .errorMsg').val("")
// $('.new-tweet form .errorMsg').append($(form));



//console.log("OUR TEST: ",$(".new-tweet form textarea")[0].value);
  //conditional on input message (empty string cannot submit)
  if ($(".new-tweet form textarea")[0].value === "" ){
    //$('.new-tweet form textarea').text($('<label>')"Hello human! You must enter something to submit ");
    //alert("Hello human! You must enter something to submit ");
    $('.errorMsg').text("Type something! Field can't be empty.")
    $('.errorMsg').slideDown();

  } else if ($(".new-tweet form textarea")[0].value.length >140){
    //alert("You're above the character limit, human!");
    $('.errorMsg').text(" You're above the character limit!")
    $('.errorMsg').slideDown();

  } else {

    $('.new-tweet form').parent().hide();
    $('.new-tweet form').find('textarea').val("");

  $.ajax({
    method: 'POST',
    url: url,
    data: OneUserFormDataString

  })

  // callback function when the request is done. We have access to the response.
    .done(response => {
      // Creating and adding all the posts to the page
      // renderTweets(response);
      console.log(response)
      latestTweet(tweetObj);
    })
  // Catching an error with the request
    .fail(error => {
      console.log(`Error: ${error}`);
    })
  // This will always execute
    .always(() => {
      console.log('POST Request completed.');
    });

  }

};



function loadTweets (url){

$.ajax({
    method: 'GET',
    url: url,
  })

    // callback function when the request is done. We have access to the response.
    .done(allTweetsInResponse => {
      // Creating and adding all the posts to the page
      // ?????? renderPosts(response);

      renderTweets(allTweetsInResponse);
    //console.log(response);
    })
    // Catching an error with the request
    .fail(error => {
      console.log(`Error: ${error}`);
    })
    // This will always execute
    .always(() => {
      console.log('GET Request completed.');
    });

};


function latestTweet(tweetObj) {

      $.ajax({
    method: 'GET',
    url: tweetObj,
  })

    // callback function when the request is done. We have access to the response.
    .done(allTweetsInResponse => {
      // Creating and adding all the posts to the page


      renderTweets([allTweetsInResponse[allTweetsInResponse.length-1]]);
    //console.log(response);
    })
    // Catching an error with the request
    .fail(error => {
      console.log(`Error: ${error}`);
    })
    // This will always execute
    .always(() => {
      console.log('GET Request completed.');
    });


}


$(document).ready(function() {


  loadTweets('/tweets');

  // The form is hidden when you first navigate to the page (and appears once you hit the compose buttton)
  $('.new-tweet').hide();

  $('.errorMsg').slideUp();

// Ajax event handler
  $('.new-tweet form').on('submit', function(event) {
    event.preventDefault();
    console.log(this, event.target);
    request(tweetObj);
  });

// Ajax even handler for error to user
   $('.new-tweet').find('textarea').on('click', function(event){
    $('.errorMsg').slideUp();
   })

  $('#nav-bar button').on('click',function(event){
    $('.new-tweet').toggle();
    $('.new-tweet').find('textarea').select();
  })


});







