var watson = require('watson-developer-cloud');
 
var personality_insights = watson.personality_insights({
  username: '4c51ffe7-b474-40ad-bec6-aa89917c54c7',
  password: '5MVOYzgrHzgd',
  version: 'v2'
});

module.exports = personality_insights;