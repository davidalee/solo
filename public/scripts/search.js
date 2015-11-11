var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Access-Control-Allow-Credentials': true
};
/*
POST /1/statuses/update.json?include_entities=true HTTP/1.1
Accept: (replace with forwardslash-asterisk-forwardslash)
Connection: close
User-Agent: OAuth gem v0.4.4
Content-Type: application/x-www-form-urlencoded
Authorization: 
        OAuth oauth_consumer_key="JGjROz3X3pf7fRg0sat3NkY0s", 
              oauth_nonce=randomString(42, , 
              //oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", 
              oauth_signature_method="HMAC-SHA1", 
              //oauth_timestamp="1318622958", 
              oauth_token="531561466-U3tQFvfi4wu4qw9s6OHHS5ArKl3unuHnT2KdRTA2", 
              oauth_version="1.0"
Content-Length: 76
Host: api.twitter.com

status=Hello%20Ladies%20%2b%20Gentlemen%2c%20a%20signed%20OAuth%20request%21
*/

var searchTwitter = function(query){
  $.ajax({
    url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + query,
    headers: headers,
    success: function(data){
      console.log('Success! (Twitter API)', data);
    },
    error: function(error){
      console.log('Error with Twitter API request: ', error);
    }
  });
};

function randomString(length) {
  var result = '',
      chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for( var i = length; i > 0; --i ){
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
};

var searchTwitterUsingSampleTweets = function(query){
  console.log('calling watson!');
  // TODO: Call Watson API with query.statuses, typeof === 'array'
};