const express = require('express')
const cors = require('cors')

const app = express()

// ------------------ Middlewares globais ------------------
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// ------------------ Rotas ------------------
const userRouter = require('../router/user.route')
const authRouter = require('../router/auth.route')


const addressRouter = require('../router/address.route')
const avatarRouter = require('../router/avatar.route')
const categoryRouter = require('../router/category.route')
const productRouter = require('../router/product.route')
const saleRouter = require('../router/sale.route')
const cartRouter = require('../router/cart.route')
const cartItemRouter = require('../router/cart_item.route')
const couponRouter = require('../router/coupon.route')
// const imageRouter = require('../router/image.route')
const logRouter = require('../router/log.route')
const paymentRouter = require('../router/payment.route')
const stockRouter = require('../router/stock.route')

app.use('/user', userRouter)
app.use('/', authRouter)

app.use('/product', productRouter)
app.use('/sale', saleRouter)
app.use('/address', addressRouter)
app.use('/avatar', avatarRouter)
app.use('/category', categoryRouter)
app.use('/cart', cartRouter)
app.use('/cart-item', cartItemRouter)
app.use('/coupon', couponRouter)
// app.use('/image', imageRouter)
app.use('/log', logRouter)
app.use('/payment', paymentRouter)
app.use('/stock', stockRouter)

app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Hello World!'
    })
})

module.exports = app