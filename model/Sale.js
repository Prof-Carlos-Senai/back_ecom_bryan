const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Sale = db.define('Sale', {
    id: { // Identificador único da Venda
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // ID do usuário que fez a compra
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    coupon_id: { // ID do cupom aplicado na compra (se houver)
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'coupons',
            key: 'id'
        }
    },
    status: { // Status da venda - (pendente, pago, enviado, entregue, cancelada)
        type: DataTypes.ENUM('PENDING', 'PAID', 'SENT', 'DELIVERED', 'CANCELED'),
        allowNull: false,
    },
    freight: { // Valor do frete
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
    },
    subtotal: { // Valor subtotal da compra (sem frete e descontos)
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // O subtotal deve ser maior que zero
        }
    },
    total: { // Valor total da compra (com frete e descontos)
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // O total deve ser maior que zero
        }
    }
}, {
    tableName: 'sales',
    timestamps: true,
});

module.exports = Sale;