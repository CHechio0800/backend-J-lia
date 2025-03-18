const express = require('express');
const userService = require ('./userservice');

const app = express (); //nome qualquer para express
app.use(express.json());// vou habilitar json express
const port = 3000
// rota para criar usuário

app.post("/users", (req, res) => {
    const {id, nome, email, senha, endereco, telefone, cpf} = req.body;

    if (!nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json 
        ( {error:"Todos os campos são obrigatórios"})
    }


    const user = userService.addUser(nome, email, senha, endereco, telefone, cpf);
    res.status(200).json({user});
});

//rota para listar todos os usuários

app.get("/users", (req,res) => {
    res.json(userService.getUsers());
});



//Rota para excluir um usuário pelo ID
app.delete("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);
    //Converte o ID para número
    try{
        const resultado = userService.deleteUser(id);
//Tenta excluir o usuario
res.status(200).json(resultado);
//Retorna a mensagem de sucesso
} catch (erro){
    res.status(404).json({erro: erro.mensage});
}
});


app.listen(port, ()=>{
    console.log('Servidor rodando na porta', port);
})