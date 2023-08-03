//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
//create web server
http.createServer(function(request,response){
	//get the pathname
	var pathname = url.parse(request.url).pathname;
	//print pathname
	console.log('pathname:'+pathname);
	//get the file extension
	var extname = pathname.match(/(\.[^.]+|)$/)[0];
	//print extname
	console.log('extname:'+extname);
	//get the file type
	var type = '';
	switch(extname){
		case '.html':
			type = 'text/html';
			break;
		case '.js':
			type = 'text/javascript';
			break;
		case '.css':
			type = 'text/css';
			break;
		default:
			type = 'text/plain';
			break;
	}
	//read file
	fs.readFile('./'+pathname,function(err,data){
		if(err){
			//print error
			console.log('error:'+err);
			//response error
			response.writeHead(404,{'content-type':'text/html'});
		}else{
			//response data
			response.writeHead(200,{'content-type':type});
			response.write(data.toString());
		}
		//send response
		response.end();
	});
}).listen(8080);
//print server start
console.log('server start...');
