class Database{
    constructor(){
        this.productos=[]
        this.log=[]
    }
    getData(){
        return[...this.productos]
    }
    saveData(form){
        form.id=this.productos.length
        this.productos.push(form)
    }
    getMessages(){
        return[...this.log]
    }
    saveMessage(msg){
        this.log.push(msg)
    }
}
module.exports= Database