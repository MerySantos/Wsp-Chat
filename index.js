//server
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});


app.use('/css',express.static('css'));
app.use('/image',express.static('image'));
app.use('/fonts',express.static('fonts'));

io.on('connection', function(socket){
	console.log('Conexion!!'); 

	socket.on('chat', function(_msg){
		console.log(_msg); // servidor
		io.emit('nuevo_mensaje', _msg); //index.html
	});

	socket.on('new-user', function(_usuario){
		// console.log(_msg); // servidor
		io.emit('integrantes', _usuario); //index.html
	});

});

http.listen(8080, function () {
	console.log('puerto 8080 ok');
});