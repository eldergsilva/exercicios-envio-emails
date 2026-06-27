const knex = require('../db')
const cadastrarUsuario = async(req,res)=>{
  const {nome,email}=req.body
  if(!nome || !email){
  return res.status(404).json({mesangem:'O nome e email São obrigatorios!'}) 
  }
  try {
    const buscarEmail = await knex('usuarios').where({ email }).first().debug()
    if (buscarEmail) {
    return res.status(400).json({mensagem:'Esse email ja foi cadastrado!'})   
    }
    
    const novoUsuario = await knex('usuarios').insert({ nome, email }).returning(['id', 'nome', 'email']);
    return res.status(201).json(novoUsuario[0]); 
  } catch (error) {
    console.log(error)
   return res.status(500).json(error)     
  }
  
} 

const deletarUsuario = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ mensagem: 'É obrigatório informar o email!' });
  }

  try {
    const buscarEmail = await knex('usuarios').where({ email }).first();

    if (!buscarEmail) {
      return res.status(404).json({ mensagem: 'Email não encontrado!' });
    }

    await knex('usuarios').where({ email }).del();
    return res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
module.exports={
    cadastrarUsuario,
    deletarUsuario
}