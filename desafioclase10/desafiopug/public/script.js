class Database{
    constructor(){
        this.productos=[]
    }
    getData(){
        return[...this.productos]
    }
    saveData(form){
        form.id=this.productos.length
        this.productos.push(form)
        console.log(this.productos)
    }
}
module.exports= Database