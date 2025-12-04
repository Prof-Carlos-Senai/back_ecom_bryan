const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('> conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
        console.error('> ERRO: falha ao conectar ao banco de dados: ', err);
    });

module.exports = sequelize;