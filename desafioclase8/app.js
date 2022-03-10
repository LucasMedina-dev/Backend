const express= require('express')
const dataRouter= require('./Routes/productos')
const app= express()
app.use(express.json())
const server=app.listen(8080, ()=>console.log('Server on'))

app.use('/api/productos', dataRouter)
app.use(express.static('public'))
