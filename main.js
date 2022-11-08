var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = new URL('http://localhost:3000' + _url).searchParams;
    var title = queryData.get('id');
    if(_url == '/'){
      title = 'Welcome!'
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);

    var fs = require('fs');
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
          <ol>
            <li><a href="/?id=HTML">HTML</a></li>
            <li><a href="/?id=CSS">CSS</a></li>
            <li><a href="/?id=JavaScript">JavaScript</a></li>
          </ol>
          <h2>${title}</h2>
          <p style="margin-top:45px;">${description}</p>
        </body>
        </html>
        `;
      response.end(template);
    });
 
});
app.listen(3000);