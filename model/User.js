const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
    id: { // Identificador único do usuário // Vai funcionar como uma Matricula se for funcionário
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { // Nome completo do usuário
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: { // Email do usuário, usado para login
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: { // Senha do usuário (hash)
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100] // Senha deve ter entre 6 e 100 caracteres
        }
    },
    phone: { // Telefone do usuário
        type: DataTypes.BIGINT,
        allowNull: true,
        validate: {
            len: [10, 11] // Telefone deve ter entre 10 e 11 dígitos
        }
    },
    cpf: { // CPF do usuário
        type: DataTypes.BIGINT,
        allowNull: true,
        unique: true,
        validate: {
            len: [11, 11] // CPF deve ter exatamente 11 dígitos
        }
    },
    access_level: { // Nível de acesso do usuário (usuário normal, administrador, proprietário do sistema, entregador)
        type: DataTypes.ENUM('USER', 'ADMIN', 'OWNER', 'DELIVERY'),
        defaultValue: 'USER',
        allowNull: false
    },
    status: { // Status do usuário (ativo, inativo) - Usuários são dados como inativos quando são bloqueados, demitidos ou por inatividade (mais de 1 ano sem login).
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    coin_points: { // Pontos de moeda do usuário (usado para descontos em próximas compras)
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    avatar_id: { // ID do avatar do usuário
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
            model: 'avatars',
            key: 'id'
        },
    }
}, {
    tableName: 'users',
    timestamps: true,
});

module.exports = User;