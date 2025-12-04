const Address = require('./Address');
const Avatar = require('./Avatar');
const Cart_item = require('./Cart_item');
const Cart = require('./Cart');
const Category = require('./Category');
const Coupon = require('./Coupon');
// const Image = require('./Image');
const Log = require('./Log');
const Payment = require('./Payment');
const Product = require('./Product');
const Sale = require('./Sale');
const Sale_item = require('./Sale_item');
const Stock = require('./Stock');
const User = require('./User');

// ============================================
// |              ROTA DA COMPRA              |
// |   USER -> SALE -> SALE_ITEM -> PRODUCT   |
// ============================================

// User 1 : N Sale
User.hasMany(Sale, {
    foreignKey: 'user_id',
    as: 'saleUser'
})

Sale.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'userSale',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------

// Sale 1 : N Sale_item
Sale.hasMany(Sale_item, {
    foreignKey: 'sale_id',
    as: 'sale_itemSale',

})

Sale_item.belongsTo(Sale, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    },
    as: 'saleSale_item',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------

// Sale_item N : 1 Product
Sale_item.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'productSale_item',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Product.hasMany(Sale_item, {
    foreignKey: 'product_id',
    as: 'sale_itemProduct',
})
// --------------------------------------------
// ============================================

// ============================================
// |             ROTA DO CARRINHO             |
// |   USER -> CART -> CART_ITEM -> PRODUCT   |
// ============================================

// User 1 : 1 Cart
User.hasOne(Cart, {
    foreignKey: 'user_id',
    as: 'cartUser'
})

Cart.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'userCart',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------

// Cart 1 : N Cart_item
Cart.hasMany(Cart_item, {
    foreignKey: 'cart_id',
    as: 'cart_itemCart',
})

Cart_item.belongsTo(Cart, {
    foreignKey: 'cart_id',
    as: 'cartCart_item',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------

// Cart_item N : 1 Product
Cart_item.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'productCart_item'
})

Product.hasMany(Cart_item, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'cart_itemProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

// --------------------------------------------
// ============================================

// ============================================
// |             ROTAS DO USUÁRIO             |
// |       USER : ADDRESS | AVATAR | LOG      |
// ============================================

// User 1 : N Address
User.hasMany(Address, {
    foreignKey: 'user_id',
    as: 'addressUser',
})

Address.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'userAddress',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------

// User N : 1 Avatar
User.belongsTo(Avatar, {
    foreignKey: 'avatar_id',
    as: 'avatarUser',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Avatar.hasMany(User, {
    foreignKey: 'avatar_id',
    as: 'userAvatar'
})
// --------------------------------------------

// User 1 : N Log
User.hasMany(Log, {
    foreignKey: 'user_id',
    as: 'logUser',
})

Log.belongsTo(User, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    },
    as: 'userLog',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------

// ============================================

// ============================================
// |             ROTAS DO PRODUTO             |
// |    PRODUCT : STOCK | CATEGORY | IMAGE    |
// ============================================

// Product N : 1 Category
Product.belongsTo(Category, {
    foreignKey: {
        name: 'category_id',
        allowNull: false
    },
    as: 'categoryProduct',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Category.hasMany(Product, {
    foreignKey: 'category_id',
    as: 'productCategory'
})
// --------------------------------------------

// Product 1 : N Stock
Product.hasMany(Stock, {
    foreignKey: 'product_id',
    as: 'stockProduct',
})

Stock.belongsTo(Product, {
    foreignKey: {
        name: 'product_id',
        allowNull: false
    },
    as: 'productStock',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------

// Product 1 : N Image
// Product.hasMany(Image, {
//     foreignKey: 'product_id',
//     as: 'imageProduct',
// })

// Image.belongsTo(Product, {
//     foreignKey: {
//         name: 'product_id',
//         allowNull: false
//     },
//     as: 'productImage',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// })
// --------------------------------------------
// ============================================

// ============================================
// |             ROTAS DA COMPRA              |
// |          SALE : PAYMENT | COUPON         |
// ============================================

// Sale N : 1 Coupon
Sale.belongsTo(Coupon, {
    foreignKey: 'coupon_id',
    as: 'couponSale',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
})

Coupon.hasMany(Sale, {
    foreignKey: 'coupon_id',
    as: 'saleCoupon'
})
// --------------------------------------------

// Sale 1 : 1 Payment
Sale.hasOne(Payment, {
    foreignKey: 'sale_id',
    as: 'paymentSale',
})

Payment.belongsTo(Sale, {
    foreignKey: {
        name: 'sale_id',
        allowNull: false
    },
    as: 'salePayment',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
// --------------------------------------------
// ============================================

module.exports = { 
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
};