const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');
const Usuario = require('./models/Usuario');
const Produto = require('./models/Produto');
const PORT = process.env.PORT || 3000;

//configuracao do handleBars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

//rota inicial
//redenriza o home.hbs para abra dentro da tag {{{body}}} no layout
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/cad_users', (req, res) => {
    res.render('cad_users');
})

app.get('/exibir_users', async (req, res) => {
    await Usuario.findAll().then((valores) => {

        if (valores.length > 0) {
            return res.render('exibir_users', {
                NavActiveUsers: true, table: true,
                usuarios: valores.map(valores => valores.toJSON())
            });
        } else {
            res.render('exibir_users', { NavActiveUsers: true, table: false, });
        }

    }).catch((err) => {
        console.log(`Houve um problema: ${err}`);
    })

})


app.post('/insert_user', async (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    await Usuario.create({
        nome: nome,
        email: email.toLowerCase(),
        senha: senha
    }).then(function () {
        console.log('Cadastro realizado com sucesso!');
        return res.redirect('/exibir_users');
    }).catch(function (erro) {
        console.log(`Ops, deu erro: ${erro}`);
    })

})
app.post('/editar_users', (req, res) => {
    var id = req.body.id;
    Usuario.findByPk(id).then((dados) => {
        return res.render('editar_users', { error: false, id: dados.id, nome: dados.nome, email: dados.email, senha: dados.senha });
    }).catch((err) => {
        console.log(err);
        return res.render('editar_users', { error: true, problema: 'N??o ?? possivel editar este registro' });
    })
})
app.post('/update_users', (req, res) => {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    Usuario.update(
        {
            nome: nome,
            email: email.toLowerCase(),
            senha: senha,
        },
        {
            where: {
                id: req.body.id
            }
        }).then((resultado) => {
            console.log(resultado);
            return res.redirect('/exibir_users');
        }).catch((err) => {
            console.log(err);
        })
})
app.post("/delete_users", function (req, res) {
    Usuario.destroy({ where: { id: req.body.id } }).then((retorno) => {
        return res.redirect('exibir_users')
    }).catch((err) => {
        console.log(err)
    })
})

///PRODUTOOSSSSSSS

app.get('/cad_produto', (req, res) => {
    res.render('cad_produto');
})

app.get('/exibir_produto', async (req, res) => {
    const retorna = await Produto.findAll().then((valores) => {

        if (valores.length > 0) {

            return res.render('exibir_produto', {
                NavActiveUsers: true, lista: true,
                produtos: valores.map(valores => valores.toJSON())
            })


        } else {
            res.render('exibir_produto', { NavActiveUsers: true, lista: false })
            console.log(valores)
        }
    }).catch((err) => {

        console.log(`Houve um problema: ${err}`)


    })

})

app.get('/editar_produto', (req, res) => {
    res.render('editar_produto');
})


app.post('/insert_produto', (req, res) => {
    console.log(req.body)

    var nome = req.body.nome;
    var preco = req.body.preco;
    var img = req.body.img;

    Produto.create({
        nome: nome,
        preco: preco,
        img: img
    }).then(function () {
        console.log('Cadastro realizado com sucesso!');
        return res.redirect('/exibir_produto');
    }).catch(function (erro) {
        console.log(`Ops, deu erro: ${erro}`);
    })



})

app.post('/editar_produto', (req, res) => {

    var id = req.body.id
    Produto.findByPk(id).then((dados) => {
        return res.render('editar_produto', { error: false, id: dados.id, nome: dados.nome, preco: dados.preco, img: dados.img })
    }).catch((err) => {
        console.log(err);
        return res.render('editar_produto', { error: true, problema: 'N??o ?? poss??vel editar este registro' })


    })

    app.post('/update_produto', (req, res) => {
        var nome = req.body.nome;
        var preco = req.body.preco;
        var img = req.body.img;

        Produto.update(
            {
                nome: nome,
                preco: preco,
                img: img
            },
            {
                where: {
                    id: req.body.id
                }
            }

        ).then((resultado) => {
            console.log(resultado)
            return res.redirect('/exibir_produto')

        }).catch((err) => {
            console.log(err)

        })



    })



})

app.post("/delete_produto", function (req, res) {


    Produto.destroy({ where: { id: req.body.id } }).then((retorno) => {
        return res.redirect('/exibir_produto')
    }).catch((err) => {
        console.log(err)
    })
})

app.listen(PORT, () => {
    console.log("Servidor rodando em localhost:" + PORT)
})


