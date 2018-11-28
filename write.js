// File just for test

var fs = require('fs');
var data = "New File Contents";
var data2 = "New file save"


fs.writeFile('temp.txt', data, function(err, data){
    if(err) throw err; 
    console.log("Sucess Written to File");
    console.log(data);
    console.log(data2);
});

