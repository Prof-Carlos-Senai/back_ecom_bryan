const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Stock = db.define('Stock', {
    id: { // Identificador único do Estoque
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: { // ID do produto ao qual o estoque pertence
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        },
    },
    quantity: { // Quantidade em estoque
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0 // A quantidade não pode ser negativa
        }
    },
    type: { // Tipo de movimentação (entrada ou saída)
        type: DataTypes.ENUM('in', 'out'),
        allowNull: false,
        defaultValue: 'in'
    },
    date: { // Data da movimentação
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'stocks',
    timestamps: true,
});

module.exports = Stock;