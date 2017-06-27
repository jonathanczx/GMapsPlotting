/**
 * reference: https://mounirmesselmeni.github.io/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/
 * checks if Filereader is supported
 * @param  {csv files} event handles files from html file input
 */
function handleFiles(e) {
      // Check for the various File API support.
      if (window.FileReader) {
          // FileReader are supported.
          var file = e.target.files[0];
          var reader = new FileReader;
          reader.readAsText(file);
          reader.onload = loadHandler;
          reader.error = errorHandler;
      } else {
          alert('FileReader are not supported in this browser.');
      }
}

function loadHandler(e){
  var csvResult = e.target.result;
  console.log(csvResult);
  var JSONString = csvToJson(csvResult);
}

function errorHandler(e){
  if(e.target.error.name){
    console.log(e.target.error);
  }
}

/**
 * Converts CSV to JSON file
 * @param  {string} csv text input
 * @return {json} json file
 */
function csvToJson(text){
  //split csv file into lines by return
  let lines = text.split("\n");
  let i = 0;
  let result = [];
  let linesLength = lines.length;
  //split a line between name and address
  for(i; i < linesLength; i++){
    let addressName = lines[i].split(",", 1);

    //address to be combined into 1 string
    let addressFull = lines[i].split(",").slice(1).join(",");
    var obj = {
      name: addressName[0],
      address: addressFull.split('"').join("")
    };
    //split line into array by comma
    result.push(obj);
  }
  console.log(result)
  return JSON.stringify(result);
}

document.getElementById('csvFile').addEventListener('change', handleFiles, false);

// $(document).ready(function(){
//   $.ajax({
//     type: "GET",
//     url: "./addresses.csv",
//     dataType: "text",
//     success: function(data){
//       csvToJson(data);
//     }
//   });

// });
