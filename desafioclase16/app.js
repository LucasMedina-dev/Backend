import express from 'express'
import {Server} from 'socket.io'

//DATABASE
import Database from './public/script.js'
const database= new Database()

//SERVER 
const app= express()
const server=app.listen(8080,()=>{console.log('server on')})
const io= new Server(server)


io.on('connection',async (socket)=>{
    let products= await database.getProducts('ecommerce')
    io.emit('productsLog', products)

    let messages= await database.getMessages('messages')
    io.emit('showMessages', messages)

    socket.on('sendData',async (data)=>{
        await database.saveProducts(data, 'ecommerce')
        let products= await database.getProducts('ecommerce')
        io.emit('productsLog', products)
    })
    socket.on('sendMessage', async (data)=>{
        await database.saveMessages(data, 'messages')
        let messages= await database.getMessages('messages')
        io.emit('showMessages', messages)
    })
    
})

app.use(express.static('public'))

