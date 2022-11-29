var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}

// 객체를 외부에서 모듈로 사용 가능
module.exports = M;