const express  =require('express')
const { cadastrarUsuario, deletarUsuario } = require('./controladores/usuarios')
const rotas = express()
rotas.post('/usuarios',cadastrarUsuario)
rotas.delete('/usuarios',deletarUsuario)

module.exports=rotas