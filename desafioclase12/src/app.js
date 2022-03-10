const express = require('express')
const {Server} = require('socket.io')

//DATABASE
const api = require('./public/script.js')
const database= new api()

//SERVER 
const app= express()
const server=app.listen(8080,()=>{console.log('server on')})
const io= new Server(server)


io.on('connection',async (socket)=>{
    let products= await database.getData()
    io.emit('productsLog', products)

    let messages= await database.getMessages()
    io.emit('showMessages', messages)

    socket.on('sendData',async (data)=>{
        await database.saveData(data)
        let products= await database.getData()
        io.emit('productsLog', products)
    })
    socket.on('sendMessage', async (data)=>{
        await database.saveMessage(data)
        let messages= await database.getMessages()
        io.emit('showMessages', messages)
    })
    
})

app.use(express.static(__dirname+'/public'))

