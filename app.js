var express = require('express');
var path = require('path');
var fs = require('fs');
var watson = require('./scripts/watson');
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

  watson.profile({
    text: someText,
    language: 'en',
    acceptLanguage: 'en-US'
  },

  // TODO: Accept URLs as search queries
  // grab HTML of site, send to watson as content-type: HTML

  function (err, profile) {
    if( err ){
      console.log('watson error: ', err);
    } else {
      res.json(profile);
    }
  })
});


// *****
// The code snippet below is for the ajax call being used in demo implementation
// *****

// app.post('/api/profile', function(req, res){
//   console.log('hi', req.body);
//   // var query = req._parsedUrl.query; 

//   // TODO: Send search query to music lyric API

//   watson.profile({
//     text: someText,
//     language: 'en',
//     acceptLanguage: 'en-US'
//   },

//   // TODO: Accept URLs as search queries
//   // grab HTML of site, send to watson as content-type: HTML

//   function (err, profile) {
//     if( err ){
//       console.log('watson error: ', err);
//     } else {
//       // var paragraphs = watson.textSummary.assemble(profile.tree);
//       console.log('yo', paragraphs);
//       res.json(profile);
//     }
//   })
// });


// personality_insights.profile({
//   text: data,
//   language: 'en' },
//   function (err, response) {
//     if (err)
//       console.log('watson error:', err);
//     else
//       console.log(JSON.stringify(response, null, 2));
// });

app.listen(3000);

// app.get('/api/profile', function(req, res, next) {
//   var parameters = extend(req.body, { acceptLanguage : i18n.lng() });

//   personalityInsights.profile(parameters, function(err, profile) {
//     if (err)
//       return next(err);
//     else
//       return res.json(profile);
//   });
// });