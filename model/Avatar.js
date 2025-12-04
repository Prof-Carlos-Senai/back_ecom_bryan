const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Avatar = db.define('Avatar', {
    id: { // Identificador único do Avatar
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nome do avatar
        type: DataTypes.STRING,
        allowNull: false 
    },
    url: { // URL do avatar
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }
}, {
    tableName: 'avatars',
    timestamps: true,
});

module.exports = Avatar;