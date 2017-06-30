$(document).ready(function(){
  $("#csvFile").change(function (e){
    $("#status").empty().text("File is uploading... ");
    var file = e.target.files[0];
    var formData = new FormData();
    formData.append("file", file);

    var jsonData;
    //callback function to store ajax response in jsonData
    function callback(response){
      jsonData = response;
    }

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
      },
      error: function(error){
        $("#status").empty().text(error);
      }
    });
  });
});

