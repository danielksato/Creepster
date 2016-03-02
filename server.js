var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var sky = require('./app/sky_api.js');
var db = require('./app/sql_interface.js');
var config = require('./webpack.config.js');
var webpack = require('webpack');
var compiler = webpack(config);
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));

app.post('/',bodyParser.urlencoded(),function(req,res){
  request(req.body.url, function(err){
    if (!err){
      sky.detect(req.body.url,function(data){
        var photoData = JSON.parse(data);
        if (photoData.photos.length){
          if (photoData.photos[0].tags.length){
            var gender = null;
            if (photoData.photos[0].tags[0].attributes.gender.confidence > 50){
              gender = photoData.photos[0].tags[0].attributes.gender.value;
            }
            var smiling = photoData.photos[0].tags[0].attributes.smiling.value === 'true' ? 1 : 0;
          }
        }
        db.addUser({
                    username: req.body.username,
                    url: req.body.url,
                    gender: gender,
                    likes: gender ? 0 : -1,
                    smiling: smiling
                  },function(){
          res.set({'Set-Cookie':'creepster_user='+req.body.username});
          res.json({
            gender: gender,
            id: new Date().getTime(),
            image_url: req.body.url,
            likes: gender ? 0 : -1,
            name: req.body.username,
            smiling: smiling ? 1 : 0
          });
        });
      });
    } else {
      res.status(500);
      res.send('Bad Picture URL')
    }
  });
});

app.get('/users',function(req,res){
  db.getAll(function(rows){
    res.set('Content-Type','application/json');
    res.status(200);
    res.send(JSON.stringify(rows.reverse()));
  });
});

app.post('/likes',cookieParser(),bodyParser.urlencoded(),function(req,res){
  if (req.cookies.creepster_user){
    like = {
      fromUser : req.cookies.creepster_user,
      toUser : req.body.name,
      value : req.body.value
    };
    db.addLike(like,function(){
      res.status(201);
      res.send('Like Received');
    });
  } else {
     res.status(401);
     res.send('Log in with a picture');
  }
});

app.post('/messages',cookieParser(),bodyParser.urlencoded(),function(req,res){
  if (req.cookies.creepster_user){
    like = {
      fromUser : req.cookies.creepster_user,
      toUser : req.body.toName,
      message : req.body.message
    }
    db.sendMessage(like,function(){
      res.status(201);
      res.send('Message sent!');
    });
  } else {
     res.status(401);
     res.send('Log in with a picture');
  }
});

app.get('/messages',cookieParser(),function(req,res){
  if (req.cookies.creepster_user) {
    db.getMessages(req.cookies.creepster_user,function(rows){
      res.set('Content-Type','application/json');
      res.status(200);
      res.send(JSON.stringify(rows));
    })
  }
  else res.redirect('/');
});

app.post('/messages/delete',cookieParser(),bodyParser.urlencoded(),function(req,res){
  if (req.cookies.creepster_user){
    db.deleteMessage(req.body.id,function(){
      res.status(201);
      res.send('Message deleted!')
    });
  } else {
    res.status(401);
    res.send('Log in with a picture');
  }
});


app.use(express.static('.'));
app.listen(3000);
