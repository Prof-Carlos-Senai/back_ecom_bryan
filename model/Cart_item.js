const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Cart_item = db.define('Cart_item', {
    id: { // Identificador único do Item do Carrinho
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cart_id: { // Identificador do Carrinho
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'carts',
            key: 'id'
        }
    },
    product_id: { // Identificador do Produto
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    quantity: { // Quantidade do Produto no Carrinho
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: { // Preço do Produto no momento da adição ao Carrinho
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    subtotal: { // Subtotal do Item (price * quantity)
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    tableName: 'cart_items',
    timestamps: true,
});

module.exports = Cart_item;