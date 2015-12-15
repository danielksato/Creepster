var request = require('request');
var auth = require('./auth.js');
var api_key = auth.api_key;
var api_secret = auth.api_secret;

exports.detect = function(url,callback){
  var baseUrl = 'http://api.skybiometry.com/fc/faces/detect.json?';
  var fullUrl = [baseUrl,'api_key=',api_key,
                 '&api_secret=',api_secret,
                 '&urls=',url,
                 '&attributes=all'].join('');
  request(fullUrl, function(err, res, body){
    if (!err && res.statusCode === 200) callback(body);
  });
}
