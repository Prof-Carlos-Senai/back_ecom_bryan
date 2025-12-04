const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Review = db.define('Review', {
    id: { // Identificador único da Avaliação
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // ID do usuário que fez a avaliação
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: { // ID do produto avaliado
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: { // Nota da avaliação
        type: DataTypes.TINYINT(1), // TINYINT são dados númericos que vão de 0 a 255
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: { // Comentário da avaliação
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'reviews',
    timestamps: true,
});

module.exports = Review;