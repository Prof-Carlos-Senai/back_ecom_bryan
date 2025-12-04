const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Cart = db.define('Cart', {
    id: { // Identificador único do Carrinho
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // Identificador do usuário dono do carrinho
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total_price: { // Preço total dos itens no carrinho
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    tableName: 'carts',
    timestamps: true,
});

module.exports = Cart;