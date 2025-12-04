const { 
    Address,
    Avatar,
    Cart_item,
    Cart,
    Category,
    Coupon,
    // Image,
    Log,
    Payment,
    Product,
    Sale,
    Sale_item,
    Stock,
    User
} = require('./model/rel')

const db = require('./db/conn')

async function syncDataBase() {
    try {
        console.log('> sincronizando banco de dados...');
        
        // ALTER QUANDO ESTIVER EM TESTE, FORCE EM PRODUÇÃO
        await db.sync({ alter: true })
        // await db.sync({ force: true })
        
        console.log('> banco de dados sincronizado.');
    } catch (err) {
        console.error('> ERRO: erro ao sincronizar banco de dados: ', err);
    } finally {
        await db.close()
        console.log('> conexão com o banco de dados encerrada.');
    }
}

syncDataBase()