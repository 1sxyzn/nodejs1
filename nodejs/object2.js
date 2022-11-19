var f = function(){
    console.log('crvt');
}
var a = [f];
a[0]();
// 위와 아래는 같은 결과 출력
// 객체에 함수 담기 (JS에서 함수는 값)
var o ={
    func:f
}
o.func();