const Sequelize = require('sequelize');
const sequelize = new Sequelize('bd_loja','root','',{
    host: '127.0.0.1',
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_cli',
        timestamps: true
    },
    logging: false
})

sequelize.authenticate().then(function(){
    console.log('Conectando no banco com sucesso');

}).catch(function(err){
    console.log('Falha ao se conectar:'+err);

})