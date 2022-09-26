const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuario');
const PORT = process.env.PORT || 3000;

//configuracao do handleBars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'hbs');

//rota inicial
//redenriza o home.hbs para abra dentro da tag {{{body}}} no layout
app.get('/', (req, res)=>{
    res.render('home');
})

app.get('/cad_users', (req, res)=>{
    res.render('cad_users');
})

app.get('/exibir_users', (req, res)=>{
    res.render('exibir_users');
})


app.post('/insert_user', (req,res)=>{
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.create({
        nome: nome,
        email: email.toLowerCase(),
        senha: senha
    }).then(function(){
        console.log('Cadastro realizado com sucesso!');
        return res.redirect('/exibir_users');
    }).catch(function(erro){
        console.log(`Ops, deu erro: ${erro}`);
    })
  
})

app.listen(PORT, () => {
    console.log("Servidor rodando em localhost:" + PORT)
})


