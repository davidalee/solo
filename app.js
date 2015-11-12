var express = require('express');
var path = require('path');
var fs = require('fs');
var watson = require('./scripts/watson');
var musixMatch = require('./scripts/musixmatch');
var app = express();

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
app.use(express.static(__dirname));

// **** REMOVE BELOW *****
// SAMPLE DATA ***** REMOVE once music lyric API is hooked up
var kanyePath = path.join(__dirname, '/text_samples/kanye_2015.txt');
var someText;

fs.readFile(kanyePath, 'utf8', function(err, data){
  if( err ){
    console.log(err);
  } else { 
    someText = data;
  }
});
// **** REMOVE ABOVE *****

app.get('/search', function(req, res){
  // This is our search query
  var query = req._parsedUrl.query; 

  // TODO: Send search query to music lyric API
  var lyrics = musixMatch.getLyrics(query);
  console.log('lyrics we got back >', lyrics);

  // TODO: Uncomment this when we want to start sending queries to Watson again and change someText to the 
  // data we're getting back from the music API
  // watson.profile({
  //   text: someText,
  //   language: 'en',
  //   acceptLanguage: 'en-US'
  // },
  // function (err, profile) {
  //   if( err ){
  //     console.log('watson error: ', err);
  //   } else {
  //     res.json(profile);
  //   }
  // })
});

app.listen(3000);