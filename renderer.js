// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
var timeout;

var searchTerm;
var PERIOD = 20000;
//updateTweetsPeriodically(searchTerm, PERIOD);

function updateTweets(searchTerm)
{
  console.log("fetching results for search term: " + searchTerm);
  client.get('search/tweets', {q: searchTerm}, function(error, tweets, response) {
    if(error) throw error;
    //console.log("tweets...");
    //console.log(tweets);  // The favorites. 

    var tweetsContainer = document.getElementById("tweets-container");
    tweetsContainer.innerHTML = "";
    for (var i in tweets.statuses)
    {
      var tweet = tweets.statuses[i];
      //console.log(tweet);
      //console.log(tweet.text);

      var tweetElem = document.createElement("div");
      tweetElem.className += tweetElem.className ? ' panel' : 'panel';
      tweetElem.className += tweetElem.className ? ' panel-body' : 'panel-body';


      if (tweet.user != null && tweet.user !== undefined)
      {
        var tweetUserDiv = document.createElement("div");
              
        tweetUserDiv.className += tweetUserDiv.className ? ' row' : 'row';

        if (tweet.user.profile_image_url != null && tweet.user.profile_image_url !== undefined)
        {
          var tweetUserImgDiv = document.createElement("div");
          tweetUserImgDiv.className += tweetUserImgDiv.className ? ' col-xs-2' : 'col-xs-2';
          var tweetUserImg = document.createElement("img");
          tweetUserImg.src = tweet.user.profile_image_url;
          tweetUserImgDiv.appendChild(tweetUserImg);
          tweetUserDiv.appendChild(tweetUserImgDiv);
        }

        var tweetUserName = document.createElement("div");
        tweetUserName.className += tweetUserName.className ? ' col-xs-6' : 'col-xs-6';
        var tweetUserNameText = "<strong><a target='_blank' href='https://twitter.com/"+tweet.user.screen_name+"'>"+tweet.user.screen_name+"</a></strong>";
        tweetUserName.innerHTML = tweetUserNameText;
        tweetUserDiv.appendChild(tweetUserName);
        tweetElem.appendChild(tweetUserDiv);
      }

      var tweetTextDiv = document.createElement("div");
      var tweetText = document.createTextNode(tweet.text);
      tweetTextDiv.appendChild(tweetText);
      tweetElem.appendChild(tweetTextDiv);
      tweetsContainer.appendChild(tweetElem);
    }
  });
}

function updateTweetsPeriodically(searchTerm, milliseconds)
{
  updateTweets(searchTerm);
  timeout = window.setTimeout(
    function()
    {
      updateTweetsPeriodically(searchTerm, milliseconds);
    }
    , milliseconds);
}

$("#search-button").click(
  function() 
  {
    searchTerm = $("#search-box").val();
    console.log("searching for: " + searchTerm);
    window.clearTimeout(timeout);
    updateTweetsPeriodically(searchTerm, PERIOD);
  }

);

