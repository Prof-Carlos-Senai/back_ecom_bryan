const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const Address = db.define('address', {
    id: { // Identificador único do Endereço
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: { // ID do usuário ao qual o endereço pertence
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    cep: { // Código de Endereçamento Postal
        type: DataTypes.INTEGER(8),
        allowNull: false
    },
    street: { // logradouro
        type: DataTypes.STRING(70),
        allowNull: false
    },
    complement: { // Complemento do endereço (opcional)
        type: DataTypes.STRING(100),
        allowNull: true
    },
    neighborhood: { // Bairro
        type: DataTypes.STRING(70),
        allowNull: false
    },
    city: { // Cidade
        type: DataTypes.STRING(70),
        allowNull: false
    },
    state: { // Estado
        type: DataTypes.STRING(2),
        allowNull: false
    },
    number: { // Número da residência
        type: DataTypes.INTEGER(12),
        allowNull: false
    }, 
    nickname: { // Apelido para o endereço (ex: "Casa", "Trabalho")
        type: DataTypes.STRING(50),
        allowNull: true
    },
    is_primary: { // Indica se o endereço é o principal do usuário
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    country: { // País
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Brasil'
    }
}, {
    tableName: 'addresses',
    timestamps: true
});

module.exports = Address;