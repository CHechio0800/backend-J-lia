const express = require('express');
const app = express();
const port = 3000;
app.get('/' , (req, res)=>{
res.send('Olá, mundo! Servidor rodando com express.');
});

app.listen(port, () => {
    console.log('Servidor rodando na porta', port);
});

app.get('/', (req, res) =>{
res.send ('Página Principal');
});

app.get('/home', (req, res) =>{
    res.send ('Página home');
});
    app.get('/login', (req, res) =>{
        res.send ('Página login');
});
app.listein(port,() => {
    console.log('Servidor rodando na porta', port);
});