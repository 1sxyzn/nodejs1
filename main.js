var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = new URL('http://localhost:3000' + _url).searchParams;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname==='/'){
      if(queryData.get('id') === null){

        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js!';
          var list = '<ul>';
          for(var i=0; i<filelist.length; i++){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
          }
          list = list + '</ul>';

          var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p style="margin-top:45px;">${description}</p>
            </body>
            </html>
            `;      
          response.writeHead(200);
          response.end(template);
        })
      }
      else{

        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js!';
          var list = '<ul>';
          for(var i=0; i<filelist.length; i++){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
          }
          list = list + '</ul>';

          var title = queryData.get('id');
          fs.readFile(`data/${title}`, 'utf8', function(err, description){
            var template = `
              <!doctype html>
              <html>
              <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
              </head>
              <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                <p style="margin-top:45px;">${description}</p>
              </body>
              </html>
              `;      
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);