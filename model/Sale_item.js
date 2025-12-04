const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Sale_item = db.define('Sale_item', {
    id: { // Identificador único do Item de Venda
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: { // ID da venda à qual o item pertence
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sales',
            key: 'id'
        }
    },
    product_id: { // ID do produto vendido
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    quantity: { // Quantidade do produto vendido
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: { // Preço unitário do produto no momento da venda
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // O preço deve ser maior que zero
        }
    },
    subtotal: { // Subtotal do item (price * quantity)
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // O subtotal deve ser maior que zero
        }
    }
}, {
    // Chave composta para garantir que o mesmo produto só possa aparecer uma vez por pedido
    indexes: [{
        unique: true,
        fields: ['sale_id', 'product_id']
    }],
    tableName: 'sale_items',
    timestamps: true,
});

module.exports = Sale_item;