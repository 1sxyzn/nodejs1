var fs = require('fs')

/*
// readFileSync 동기
console.log('A')
var result = fs.readFileSync('nodejs/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

// readFile 비동기
console.log('A')
fs.readFile('nodejs/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');