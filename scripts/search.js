var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept, Authorization, X-Request-With',
    'Access-Control-Allow-Credentials': true
};


// var searchTwitter = function(query){
//   $.ajax({
//     url: 'https://api.twitter.com/1.1/search/tweets.json?q=' + query,
//     headers: headers,
//     success: function(data){
//       console.log('Success! (Twitter API)', data);
//     },
//     error: function(error){
//       console.log('Error with Twitter API request: ', error);
//     }
//   });
// };

// function randomString(length) {
//   var result = '',
//       chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
//   for( var i = length; i > 0; --i ){
//     result += chars[Math.round(Math.random() * (chars.length - 1))];
//   }
//   return result;
// };

// var searchTwitterUsingSampleTweets = function(query){
//   console.log('calling watson!');
//   // TODO: Call Watson API with query.statuses, typeof === 'array'
// };

var searchLyrics = function(query) {
  // TODO: Send GET request to music lyric api
};