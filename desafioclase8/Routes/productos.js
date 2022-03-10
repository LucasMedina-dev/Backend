const express= require('express')
const fs= require('fs')
const router= express.Router()


let data
const readDataFile=(id)=>{
    if(id){
        try{data= JSON.parse(fs.readFileSync('./Routes/items.txt', "utf-8"))[id]}
        catch{writeDataFile([])}
    }else{
        try{data= JSON.parse(fs.readFileSync('./Routes/items.txt', "utf-8"))}
        catch{writeDataFile([])}
    }
}
const writeDataFile=(data)=>{
    fs.writeFileSync("./Routes/items.txt", JSON.stringify(data))
}
router.get('/',(req,res)=>{
    readDataFile()
    data ? true : writeDataFile([])
    readDataFile()
    res.send(data)
})
router.get('/:id',(req,res)=>{
    let id= parseInt(req.params.id)-1
    console.log(id)
    readDataFile(id)
    data ? res.send(data) : res.send({error: "Error, producto no encontrado"})
})
router.post('/',(req,res)=>{
    readDataFile()
    const receivedData= req.body
    let id= new Date().getSeconds()
    while(data[id]){ 
        id=id+1
    }
    data[id]=receivedData
    writeDataFile(data)
    res.send(data)
})
router.put('/:id',(req,res)=>{
    let id= (req.params.id)-1
    const receivedData= req.body
    readDataFile()
    data[id]=receivedData
    writeDataFile(data)
    readDataFile()
    res.send(data)
})
router.delete('/:id',(req,res)=>{
    
})

module.exports=router;