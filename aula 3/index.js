const express = require('express');
const userService = require ('./userservice');

const app = express (); //nome qualquer para express
app.use(express.json());// vou habilitar json express

// rota para criar usuário

app.post("/users", (req, res) => {
    const {id, nome, email, senha, endereco, telefone, cpf} = req.body;
    if (!id || !nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json 
        ( {error:"Todos os campos são obrigatórios"})
    }


    const user = userService.addUser(nome,email);
    res.status(200).json({user});
});

//rota para listar todos os usuários

app.get("/users", (req,res) => {
    res.json(userService.getUsers());
});

const port = 3000;
app.listen(port,() => {
    console.log("Servidor rodando na porta", port);
}
)

