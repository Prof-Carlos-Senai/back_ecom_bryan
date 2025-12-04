require('dotenv').config()
const app = require('./server/app')
const db = require('./db/conn_local')

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || 'localhost'


db.sync()
.then(()=>{
    app.listen(PORT, HOST, ()=>{
        console.log(`> servidor rodando em http://${HOST}:${PORT}`);  
    })
})
.catch((err)=>{{
    console.error('> ERRO: erro ao conectar o banco: ', err);
}})