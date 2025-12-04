const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Delivery = db.define('delivery', {
    id: { // Identificador único da Entregador
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // Dados padrões do entregador
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    vehicle_type: { // Tipo de veículo utilizado pelo entregador - Bicicleta, Moto, Carro, outros
        type: DataTypes.ENUM('bike', 'motorcycle', 'car', 'other'),
        allowNull: false,
        defaultValue: 'car'
    },
    license_plate: { // Placa do veículo
        type: DataTypes.STRING,
        allowNull: true, // Pode ser nulo se o entregador não usar veículo motorizado
    },
    status: { // Status do entregador - Disponível, Ocupado, Inativo
        type: DataTypes.ENUM('available', 'busy', 'inactive'),
        allowNull: false,
        defaultValue: 'available'
    }
}, {
    tableName: 'deliveries',
    timestamps: true,
});

module.exports = Delivery;