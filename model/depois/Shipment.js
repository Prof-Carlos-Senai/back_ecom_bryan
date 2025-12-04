const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Shipment = db.define('shipment', {
    id: { // Identificador único da Entrega
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sale_id: { // Identificador da Venda associada
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Cada venda deve ter apenas uma entrega associada
        references: {
            model: 'sales',
            key: 'id'
        }
    },
    address_id: { // Identificador do Endereço de Entrega
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'addresses',
            key: 'id'
        }
    },
    delivery_id: { // Identificador do Entregador
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'deliveries',
            key: 'id'
        }
    },
    estimated_delivery_date: { // Data estimada para a entrega
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    shipped_at: { // Data e hora do envio
        type: DataTypes.DATE,
        allowNull: true // Pode ser nulo se ainda não foi enviado
    },
    delivered_at: { // Data e hora da entrega
        type: DataTypes.DATE,
        allowNull: true // Pode ser nulo se ainda não foi entregue
    },
    tracking_number: { // Número de rastreamento da entrega
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Cada entrega deve ter um número de rastreamento único
    },
    status: { // Status da entrega (e.g., 'aguardando envio', 'enviado', 'em trânsito', 'sai para entrega', 'entregue', 'perdido', 'devolvido')
        type: DataTypes.ENUM('AWAITING_SHIPMENT', 'SHIPPED', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'LOST', 'RETURNED'),
        allowNull: false,
        defaultValue: 'AWAITING_SHIPMENT'
    }
}, {
    tableName: 'shipments',
    timestamps: true,
});

module.exports = Shipment;

// EXPLICAÇÃO

// A entrega ela precisa ter a compra, o endereço de entrega e o entregador

// Status da entrega:
// Aguardando Envio: A entrega foi criada, mas ainda não foi enviada.
// Enviado: A entrega foi despachada do centro de distribuição.
// Em Trânsito: A entrega está a caminho do destino.
// Sai para Entrega: A entrega está a caminho da casa do cliente.
// Entregue: A entrega foi concluída com sucesso.
// Perdido: A entrega não pôde ser localizada.
// Devolvido: A entrega foi devolvida ao remetente.

// lógica da entrega: aguardando envio -> enviado -> em trânsito -> sai para entrega -> entregue
// estados finais: entregue, perdido, devolvido