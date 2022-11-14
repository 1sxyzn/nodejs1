/*
function a(){
    console.log('A');
}
*/

// 이름이 없는 함수, 익명 함수
var a = function(){ // JS에서 함수는 값이다.
    console.log('A');
}

// 오랜시간이 걸리는 함수라고 가정
function slowfunc(callback){
    callback();
}

slowfunc(a);

// 오랜시간이 걸리는 slowfunc가 실행이 되고 callback 함수인 a 가 실행됨