let product= document.getElementById("productForm")

const submitData=(evt, form, route)=>{
    evt.preventDefault()
    let formData= new FormData(form)
    let obj={}
    formData.forEach((value, key)=>obj[key]=value)
    fetch(route, {
        method: 'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-type':'application/json'
        }
    }).then(res=>res.json()).then(json=>console.log(json))
}
product.addEventListener('submit', e=>{
    submitData(e, e.target, '/api/productos')
    e.target.forEach(x=>x.value="")
})