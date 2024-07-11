const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const scoketio = require('socket.io')
const server = http.createServer(app);

const io = scoketio(server);

app.set('view engine', 'ejs');
// app.set(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname,'public')));

io.on("connection", (socket) => {
    console.log("connected")
})

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(5000, () => console.log("server running at 5000 port"))