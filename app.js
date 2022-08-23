const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

server.listen(3000);

users = [];
connections = [];

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
    console.log("Успешное соединение");
    connections.push(socket);


    socket.on('disconnect', function() {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});

    socket.on('send message', (data) => {
        io.emit('add message', {msg : data.message, name: data.name, className : data.className});
    });
});

