# WEB with Node.js

## JavaScript
- var : 변수 선언
- literal : 데이터를 표현하는 방식
- template literal : \`content ${variable} content\` 를 사용하여 표현 가능, 줄바꿈도 자동으로 인식

## Node.js
- input : `var args = process.argv;` `console.log(args[2]);` 로 입력값 출력 가능 (임시방편..)
- `var queryData = new URL('http://localhost:3000' + _url).searchParams;`  
    `var queryDataId = queryData.get('id')` 을 할 경우 id가 없으면 null (사용)   
    `var queryData = url.parse(_url, true).query;`  
    `var queryDataId = queryData.id` 을 할 경우 id가 없으면 undefined (사용 X)  
