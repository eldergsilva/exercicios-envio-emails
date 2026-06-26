const express  =require('express')
const { cadastrarUsuario } = require('./controladores/usuarios')
const rotas = express()
rotas.post('/usuarios',cadastrarUsuario)

module.exports=rotas