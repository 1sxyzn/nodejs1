// data 파일 아래에 있는 목록을 배열로 만들어서 가져오기

var testFolder = './data/';
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist);
  })