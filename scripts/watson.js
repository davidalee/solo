var watson = require('watson-developer-cloud');
 
var personality_insights = watson.personality_insights({
  username: '',
  password: '',
  version: 'v2'
});

module.exports = personality_insights;