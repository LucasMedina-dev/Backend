const express= require('express')
const handlebars = require('express-handlebars')
const api=require('../public/script.js')
const database= new api()
const app= express()



app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.engine(
    "handlebars",
    handlebars.engine({
        extname: ".handlebars",
        defaultLayout: 'main.handlebars',
    })
);
app.set('views', '../views')
app.set('view engine', 'handlebars')


app.get('/',(req,res)=>{
    res.render('form')
})
app.get('/productos', (req, res)=>{
    const data= database.getData()
    res.render('products',{data:data})
})
app.post('/productos', (req,res)=>{
    const data= req.body
    
    database.saveData(data)
    res.redirect('/')
})


const server=app.listen(8080, ()=>console.log('Server on'))