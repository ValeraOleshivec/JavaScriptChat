const express = require('express');
const app = express();
const serverless = require('serverless-http')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);




app.get('/', (req, res) => {
    res.sendFile('index.html', {root: '../dist'});
});


server.listen(3000, () => {
    console.log('listening on:3000');
});


let users = {};

joinUser = function (array,id,name,avatar){
    let user = {
        id:id,
        name:name,
        avatar:avatar
    }
    array[id]=user;
}
let id = 0;

connections=[];
listMessages=[]

io.sockets.on('connection', (socket)=>{
    connections.push(socket)
    let userId
    socket.emit('array', {users:users,array:listMessages})
    socket.on('disconnect', function (data){
        connections.splice(connections.indexOf(socket),1)
        io.sockets.emit('remove User',{id:userId})
        delete users[userId]
    })
    socket.on('send message', (value)=>{
        io.sockets.emit('add message',{message:value.value,userId:userId,name:users[userId].name})
        listMessages.push(value.value)
        io.sockets.emit('pushArray',{array:listMessages})
    })
    socket.on('send userName',(name)=>{
        id++
        userId=id
        joinUser(users,id,name.name,name.avatar)
        io.sockets.emit('get userName',{Name:name.name,users:users,id:userId})
        io.sockets.emit('renderArray',{array:users})
    })
})
