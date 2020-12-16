const io = require('socket.io')(3000)

const users={}
io.on('connection',socket =>{
    console.log('new user')
    //socket.emit('chat-message','Hello - world')
    //socket.broadcast.emit('onlie-users',{})
    
    socket.on('user-joined',name=>{
        //console.log('joined',data)
        users[socket.id] = name
        console.log('the array is ',users)
        socket.broadcast.emit('print-user',{name:name})
        socket.broadcast.emit('online-users',{usersarr:users})
        socket.emit('online-users',{usersarr:users})
    })
    socket.on('send-chat-message',data=>{
        console.log(data)
        socket.broadcast.emit('chat-message',data)
        // broadcast means emit to every single other client
        //it will not send it back to original user
    })
    // this is by default fired or emitted by socket during disconnection
    socket.on('disconnect',()=>{
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
        socket.broadcast.emit('online-users',{usersarr:users})
    })
})