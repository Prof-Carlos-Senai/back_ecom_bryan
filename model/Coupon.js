const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Coupon = db.define('Coupon', {
    id: { // Identificador único do Cupom
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nome do cupom
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    code: { // Código do cupom
        type: DataTypes.STRING,
        allowNull: false,
    },
    discount: { // Valor do desconto (em porcentagem)
        type: DataTypes.DECIMAL(3, 2), // Exemplo: 0.10 para 10%
        allowNull: false,
        validate: {
            min: 0.01, // Desconto mínimo de 1%
            max: 0.99  // Desconto máximo de 99%
        }
    },
    expiration_date: { // Data de expiração do cupom
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    tableName: 'coupons',
    timestamps: true,
});

module.exports = Coupon;