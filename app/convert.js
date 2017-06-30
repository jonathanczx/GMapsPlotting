  /**
   * Converts CSV to JSON file
   * @param  {string} csv text input
   * @return {json} json file
   */
module.exports.csvToJson = function(text){
  //split csv file into lines by return
  let lines = text.split("\r\n");
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
    //
    result.push(obj);
  }
  console.log(result);
  return JSON.stringify(result);
};
