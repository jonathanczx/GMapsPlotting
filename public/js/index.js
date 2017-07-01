$(document).ready(function(){
  //set up google maps api
  if (document.querySelectorAll('#map').length > 0)
  {
    if (document.querySelector('html').lang)
      lang = document.querySelector('html').lang;
    else
      lang = 'en';

    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCHclD71jH3xZRMkSDnopDC__RRHroaQg4&callback=initMap';
    document.getElementsByTagName('head')[0].appendChild(js_file);
  } 

  $("#csvFile").change(function (e){
    $("#status").empty().text("File is uploading... ");
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);

    //make ajax post call 
    $.ajax({
      url: 'http://localhost:8080/upload',
      type: 'post',
      data: formData,
      processData: false,
      contentType: false,
      success: function(res){
        //successful request
        $("#status").empty().text(res);
        callback(res);
        addrToLatLng(jsonData, jobID);
      },
      error: function(error){
        $("#status").empty().text(error);
      }
    });
  }); 
});



var map;
var jobID;
var jsonData;
var markers = [];


function initMap(){
  var options = {
      zoom: 8,
      center: {lat: -27.381, lng: 152.432},
      mapTypeId: 'roadmap'
    };
  map = new google.maps.Map(document.getElementById('map'), options);
  
  
};

//convert address to coordinates
function addrToLatLng(address, response){
  var jsonAddress = JSON.parse(address);
  var response = [];
  var geocoder = new google.maps.Geocoder();
  for (var i=0; i < jsonAddress.length; i++){
    var name = jsonAddress[i].name;
    var addr = jsonAddress[i].address;
    geocoder.geocode({'address': addr}, function(results, status){
      if (status === 'OK'){
        console.log(results);
        markers.push(
          new google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            animation: google.maps.Animation.DROP
          }));           
      } else {
        console.log('geocode was not successful: ' + status);
      }
    });
  };
  console.log(response);
  callbackGeocode(response);
};

//callback function to store ajax response in jsonData
function callback(response){
  jsonData = response;
}

function callbackGeocode(response){
  jobID = response;
}

