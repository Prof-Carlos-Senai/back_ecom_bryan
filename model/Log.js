const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Log = db.define('Log', {
    id: { // Identificador único do Log
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // ID do usuário associado ao log
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    action: { // Ação realizada (e.g., 'create', 'update', 'delete', 'login', etc.)
        type: DataTypes.STRING, 
        allowNull: false
    },
    description: { // Descrição detalhada da ação
        type: DataTypes.TEXT,
        allowNull: true
    },
    ip_address: { // Endereço IP do usuário que realizou a ação
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'logs',
    timestamps: true,
});

module.exports = Log;