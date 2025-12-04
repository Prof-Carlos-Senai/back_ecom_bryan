const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Wishlist = db.define('Wishlist', {
    id: { // Identificador único da Lista de Desejos
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // ID do usuário dono da lista de desejos
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    product_id: { // ID do produto adicionado à lista de desejos
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    }
}, {
    tableName: 'wishlists',
    timestamps: true,
});

module.exports = Wishlist;