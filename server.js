import express from 'express';
import { Contenedor } from './contenedor.js'
let contenedor1 = new Contenedor()

const PORT = process.env.PORT || 8080

const app = express();

app.set('view engine', 'pug');
app.set('views','./views')

app.use(express.urlencoded({extended:true}))

//formularios para listar, agregar, editar y eliminar elementos
app.get('/',(req,res)=>{
    res.render("main.pug")
})
app.get('/productos',(req,res)=>{
    const productos = contenedor1.getAll()
    res.render("list",{productos})
})
app.post('/productos',async(req,res)=>{
    const data = req.body
    await contenedor1.post(data)
    res.redirect('/')
})


const server = app.listen(PORT,()=>{
    console.log(`servidor http escuchando en el puerto ${server.address().port}`)
})

server.on('error',error=> console.log(`error en el servidor ${error}`))