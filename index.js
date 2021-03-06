var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
const port = process.env.PORT || 4000;
var server = app.listen(port, () => {
    console.log("Listening to request on port 4000");
});


//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', (socket)=> {
    console.log("Socket connection made");    

    socket.on('chat', (data)=>{
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });
})