const express = require('express')
const app = express()

//Dùng http để tạo http server
const http = require('http')
const server = http.createServer(app)

//Sử dụng socket.io
const{Server} = require('socket.io')
const io = new Server(server)

//tạo đường dẫn web trả về
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


//Tạo kết nối
io.on('connection', (socket) => {
    console.log('Client connected');

    // dataSchema.find().then(result => {
    //     socket.emit('on-btn', result)
    // })

    socket.on('on-chat', message => {
        console.log(message)
        //gửi tới toàn bộ client
        io.emit('user-chat', message)
    });

    socket.on('on-btn', led => {
        console.log(led);

        io.emit('on-btn', led)
    });

})

server.listen(3000, () => {
    console.log('Listenning on port 3000')
})