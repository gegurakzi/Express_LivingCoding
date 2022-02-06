const express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var topicRouter = require('./routes/topic.js');
var indexRouter = require('./routes/index.js');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(express.static('public'));

app.get('*', function(req, res, next){
  fs.readdir('./data', function(error, filelist){
    req.list = filelist;
    next();
  });
});

app.use('/', indexRouter);

app.use('/topic', topicRouter);

app.use(function(req, res, next){
  res.status(404).send("HTTP 404 Error: Cannot find page");
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send("HTTP 500 Error: no such page");
});

app.listen(3000, () => console.log('Example app listening on port 3000'));