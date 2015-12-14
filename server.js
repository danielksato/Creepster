var express = require('express');
var bodyParser = require('body-parser');
var sky = require('./app/sky_api.js');
var db = require('./app/sql_interface.js');
var app = express();

app.post('/',bodyParser.urlencoded(),function(req,res){
  console.log(req.body.url);
  sky.detect(req.body.url,function(data){
    var photoData = JSON.parse(data);
    if (photoData.photos.length > 0){
      db.addUser(photoData.photos[0].tags);
    }
    res.status(201);
    res.sendFile(__dirname+'/index.html');
  });
});


app.use(express.static('.'));
app.listen(3000);
