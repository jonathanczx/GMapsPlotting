//require express
var express = require('express');
var path    = require('path');
//router object
var router = express.Router();
//require filesystem
var fs = require('fs');
//require multiparty
var multiparty = require('multiparty');

//route for homepage
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../index.html'));
});




//export router
module.exports = router;