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
            socketId: socket.id
        };
        io.emit('chat message', data)      
    });  
});

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});