//require express
var express = require('express');
var path    = require('path');
//router object
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: '../public/upload/'});
var convert = require('./convert');
var fs = require('fs');
var bodyParser = require('body-parser');
var type = upload.single('file');

//googlemaps Geocoding
var gmaps = require('./maps');

var jsonParser = bodyParser.json();
//route for homepage
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../index.html'));
});

//post function to upload file and write json file.
// router.post('/', type , uploadController.uploadCsv);
router.post('/upload', upload.single('file'), function(req, res){
  //assign input file
  var file = req.file;

  //read file
  var csvData = fs.readFileSync(file.path, 'utf8');
  var jsonData = convert.csvToJson(csvData);
  res.json(jsonData);
});

// router.post('/geocode', jsonParser, function(req, res){
//   console.log("RequBody", req.body); //dont know this part
//   var reqAddress = req.body;
//   var i = 0;
//   var apiKey = "AIzaSyCfCdK6AzQ-qPV0Xd7x0HmzY-Lvlb82VIs";
//   for (i; i < reqAddress.length; i++){
//     $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&key=' + apiKey,
//      null,
//      function(data){
//       console.log(data);
//       reqAddress[i].result = data;
//      });
//   }
//   res.json(reqAddress);
// });

//export router
module.exports = router;