// module.exports.initMap = function() {
//         var map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 8,
//           center: {lat: -27.381, lng: 152.432}
//         });
//         var geocoder = new google.maps.Geocoder();


//           geocodeAddress(geocoder, map);
//       }

module.exports.geocodeAddress = function(address, resultsMap) {
  var geocoder = google.maps.Geocoder;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      console.log(results);
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}