var watson = require('watson-developer-cloud');

// *** TEMPORARY ***
// reading from .txt files
var fs = require('fs');
var path = require('path');

// var kanyePath = path.join(__dirname, '../text_samples/kanye_2015.txt');
// var data;

// fs.readFile(kanyePath, 'utf8', function(err, data){
//   if( err ){
//     console.log(err);
//   } else { 
//     data = data;
//     console.log('data length is', data.length);
//   }
// });

 
// pi = watson.personality_insights({
//   "credentials": {
//     url: "https://gateway.watsonplatform.net/personality-insights/api",
//     username: "4c51ffe7-b474-40ad-bec6-aa89917c54c7",
//     password: "5MVOYzgrHzgd",
//     version: "v2"
//   }
// });


 
var personality_insights = watson.personality_insights({
  username: '4c51ffe7-b474-40ad-bec6-aa89917c54c7',
  password: '5MVOYzgrHzgd',
  version: 'v2'
});
 
// personality_insights.profile({
//   text: data,
//   language: 'en' },
//   function (err, response) {
//     if (err)
//       console.log('watson error:', err);
//     else
//       console.log(JSON.stringify(response, null, 2));
// });

module.exports = personality_insights;