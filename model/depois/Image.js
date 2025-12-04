const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Image = db.define('Image', {
    id: { // Identificador único da Imagem
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: { // ID do produto ao qual a imagem pertence
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id'
        }
    },
    url: { // URL da imagem
        type: DataTypes.STRING,
        allowNull: false
    },
    alt_text: { // Texto alternativo para a imagem
        type: DataTypes.STRING,
        allowNull: true
    },
    is_primary: { // Indica se a imagem é a principal do produto
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    tableName: 'images',
    timestamps: true,
});

module.exports = Image;