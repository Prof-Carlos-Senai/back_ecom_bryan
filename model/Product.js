const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Product = db.define('Product', {
    id: { // Identificador único do produto
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nome do produto
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: { // Descrição do produto
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: { // Preço do produto
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // Preço deve ser maior que 0
        }
    },
    status: { // Status do produto (ativo, inativo) - Definido como inativo quando o produto não está mais disponível para venda.
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    slug: { // Slug do produto para URLs amigáveis
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    blocks: { // Número de blocos do produto
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1 // Deve ter pelo menos 1 bloco
        }
    },
    age_min: { // Idade mínima recomendada para o produto
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3,
        validate: {
            min: 0 // Idade mínima não pode ser negativa
        }
    },
    avaliation: { // Avaliação média do produto
        type: DataTypes.FLOAT(5, 1),
        allowNull: true,
        validate: {
            min: 0.0,
            max: 5.0
        }
    },
    stock: { // Estoque
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    reserved_stock: { // Valor do estoque que está reservado
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    category_id: { // ID da categoria do produto
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id'
        },
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: true
        }
    }

}, {
    tableName: 'products',
    timestamps: true,
});

module.exports = Product;