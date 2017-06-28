var express = require('express');
var app = express();
var port = 8080;

//router 
var router = require('./app/routes');
app.use('/', router);

app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
  console.log('app started');
});
