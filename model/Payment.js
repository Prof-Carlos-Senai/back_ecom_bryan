const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Payment = db.define('Payment', {
    id: { // Identificador único do Pagamento
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: { // ID da venda associada ao pagamento
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'sales',
            key: 'id'
        }
    },
    method: { // Método de pagamento (e.g., 'Cartão de Crédito', 'paypal', 'Transferência Bancária', etc.)
        type: DataTypes.ENUM('credit_card', 'paypal', 'bank_transfer', 'pix', 'other'),
        allowNull: false,
        defaultValue: 'other'
    },
    amount: { // Valor pago
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: { // Status do pagamento - (pendente, concluído, falhado)
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        allowNull: false,
        defaultValue: 'pending'
    },
    transaction_id: { // ID da transação fornecido pelo gateway de pagamento (se aplicável) 
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    paid_at: { // Data e hora em que o pagamento foi realizado
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'payments',
    timestamps: true,
});

module.exports = Payment;