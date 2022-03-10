const socket= io()

//PRODUCTS
let form= document.getElementById('productForm')
let productDocument= document.getElementById('products')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let data= new FormData(form)
    let sendObj={}
    data.forEach((val,key)=>sendObj[key]=val)
    socket.emit('sendData', sendObj)
    form.reset()
})

socket.on('productsLog', (data)=>{
    fetch('templates/products.handlebars').then(res=>{
        return(res.text())
    }).then(template=>{
        const processedTemplate=  Handlebars.compile(template)
        const templateHTML=  processedTemplate({data})
        productDocument.innerHTML= templateHTML
    })
})

//CHATBOX
let messagesDoc= document.getElementById('messages')
let message= document.getElementById('message')
let email= document.getElementById('email')
let chatboxForm= document.getElementById('chatboxForm')

chatboxForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let data= {
        email:email.value,
        message:message.value
    }
    socket.emit('sendMessage', data)
    chatboxForm.reset()
})

socket.on('showMessages', data=>{
    fetch('templates/chatbox.handlebars').then(res=>{
        return(res.text())
    }).then(template=>{
        const processedTemplate=  Handlebars.compile(template)
        const templateHTML=  processedTemplate({data})
        messagesDoc.innerHTML= templateHTML
    })
})