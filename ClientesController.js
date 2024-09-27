import express from 'express'
const router = express.Router()
import Cliente from "../models/Cliente.js"
import { where } from 'sequelize'

// ROTA CLIENTES
router.get("/clientes", function(req,res){
   Cliente.findAll().then(clientes => {
       res.render("clientes", {
        clientes:clientes
       })

   })
})
/// rota de cadastro de clientes
router.post("/clientes/new", (req,res)=>{
    //recebendo os dados do formulario
    const nome= req.body.nome
    const cpf= req.body.cpf
    const endereco= req.body.endereco
    Cliente.create({
        nome:nome,
        cpf:cpf,
        endereco:endereco,
    }).then(()=>{
        res.redirect("/clientes")
    })
})
//rota possui parametro id
router.get("/clientes/delete/:id", (req,res)=>{
//coletar o id da url
const id = req.params.id
//metodo para excluir
Cliente.destroy({
    where: {
        id:id
    }
}).then(()=>{
    res.redirect("/clientes")
}).catch(error =>{
    console.log(error)
})

})
export default router