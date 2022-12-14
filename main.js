var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var app = http.createServer(function(request,response){  // 웹 서버 생성
    var _url = request.url;
    var queryData = new URL('http://localhost:3000' + _url).searchParams;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname==='/'){
      if(queryData.get('id') === null){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js!';
          var list = template.list(filelist);
          var html = template.HTML(title, list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a>`);   
          response.writeHead(200);
          response.end(html);
        })
      }
      else{
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.get('id')).base;
          var list = template.list(filelist);
          var title = queryData.get('id');
          fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
            var sanitizedTitle = sanitizeHtml(title);
            var sanitizedDescription = sanitizeHtml(description, {
              allowedTags:['h1']
            });
            var html = template.HTML(sanitizedTitle, list,
              `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
              `<a href="/create">create</a>
              <a href="/update?id=${sanitizedTitle}">update</a>
              <form action="delete_process" method="post">
                <input type = "hidden" name="id" value="${sanitizedTitle}">
                <input type = "submit" value="delete">
              </form>`);     
            response.writeHead(200);
            response.end(html);
          });
        });
      }
    }
    else if(pathname==="/create"){
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.HTML(title, list, `
          <form action="/create_process" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
        `, '');   
        response.writeHead(200);
        response.end(html);
      })
    }
    else if(pathname==="/create_process"){
      var body = '';
      // 정보 더하기
      request.on('data', function(data){
        body = body + data;
      });

      // 더이상 들어올 정보가 없으면
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        })
      });
    }
    else if(pathname === '/update'){
      fs.readdir('./data', function(error, filelist){
        var list = template.list(filelist);
        var title = queryData.get('id');        
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var html = template.HTML(title, list,
            `
            <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
            `,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);     
          response.writeHead(200);
          response.end(html);
        });
      });
    }
    else if(pathname==='/update_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`,`data/${title}`,function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
        })
      });
    }
    else if(pathname==='/delete_process'){
      var body = '';
      request.on('data', function(data){
        body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(error){
          response.writeHead(302, {Location: `/`});
          response.end();
        })
      });
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000); // 요청에 대해 응답할 수 있도록 Http 서버 구동시키는 API, 3000번 port 이용