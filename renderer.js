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

  client.get('search/tweets', {q: "amazon web services"}, function(error, tweets, response) {
    if(error) throw error;
    //console.log("tweets...");
    //console.log(tweets);  // The favorites. 


    var body = document.getElementById("body");
    for (var i in tweets.statuses)
    {
      var tweet = tweets.statuses[i];
      //console.log(tweet);
      //console.log(tweet.text);

      var tweetElem = document.createElement("div");
      tweetElem.className += tweetElem.className ? ' panel' : 'panel';

      if (tweet.user != null && tweet.user !== undefined)
      {
        var tweetUserDiv = document.createElement("div");
        if (tweet.user.profile_image_url != null && tweet.user.profile_image_url !== undefined)
        {
          var tweetUserImg = document.createElement("img");
          tweetUserImg.src = tweet.user.profile_image_url;
          tweetUserDiv.appendChild(tweetUserImg);
        }

        var tweetUserName = document.createElement("h4");
        var tweetUserNameText = tweet.user.name + " - "+"<a target='_blank' href='https://twitter.com/"+tweet.user.screen_name+"'>"+tweet.user.screen_name+"</a>";
        tweetUserName.innerHTML = tweetUserNameText;
        tweetUserDiv.appendChild(tweetUserName);
        tweetElem.appendChild(tweetUserDiv);
      }

      var tweetTextDiv = document.createElement("div");
      var tweetText = document.createTextNode(tweet.text);
      tweetTextDiv.appendChild(tweetText);
      tweetElem.appendChild(tweetTextDiv);
      body.appendChild(tweetElem);
    }
  });


