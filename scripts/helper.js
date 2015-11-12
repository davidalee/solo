var convertPercentage = function(num){
  var x = String(num*100).match(/^(\d{0,2})\./) ? String(num*100).match(/^(\d{0,2})\./)[1] : 0;
  return x + '\%';
};
