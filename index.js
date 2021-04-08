const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const cors = require('cors');

const PORT = process.env.PORT || 3001

app.use(cors({
    origin: 'http://localhost:3000'
}));

io.on('connection', (socket) => {
    console.log('a user connected on ' + socket);
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        const data = {
            roomId: msg.roomId,
            text: msg.text,
            username: msg.username,
            usernameColor: msg.usernameColor,
            socketId: socket.id
        };
        io.emit('chat message', data)      
    }); 
    
    socket.on('new room created', (msg) => {
        const data = {
            roomId: msg.roomId,
            roomName: msg.roomName,
            username: msg.username
        };
        io.emit('new room created', data)
    })

    socket.on('user joined a room', (msg) => {
        const data = {
            roomId: msg.roomId,
            username: msg.username
        };
        io.emit('user joined a room', data)
    })
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});