const Address = require('../model/Address')
const { Op } = require('sequelize')

// USUÁRIO NORMAL
async function createAddress(user_id, dados) {
    const { cep, street, complement, neighborhood, city, state, number, nickname, is_primary, country } = dados

    if (!cep || !street || !neighborhood || !city || !state || !number || !country) {
        throw new Error('Dados incompletos para criar o endereço')
    }

    const newAddress = await Address.create({
        user_id,
        cep,
        street,
        complement,
        neighborhood,
        city,
        state,
        number,
        nickname,
        is_primary: is_primary || false,
        country
    })

    return newAddress
}

async function readUserAddresses(user_id) {
    // Busca apenas os endereços do usuário logado
    const addresses = await Address.findAll({
        where: {
            user_id: user_id
        }
    })

    if (addresses.length === 0) {
        throw new Error('Nenhum endereço encontrado para este usuário')
    }

    return addresses
}

async function updateAddress(user_id, address_id, dados) {
    // Verifica se o endereço pertence ao usuário
    const address = await Address.findByPk(address_id)

    if (!address) {
        throw new Error('Endereço não encontrado')
    }

    if (address.user_id !== Number(user_id)) {
        throw new Error('Você não tem permissão para atualizar este endereço')
    }

    await address.update(dados)

    return address
}

async function deleteAddress(user_id, address_id) {
    // Verifica se o endereço pertence ao usuário
    const address = await Address.findByPk(address_id)

    if (!address) {
        throw new Error('Endereço não encontrado')
    }

    if (address.user_id !== user_id) {
        throw new Error('Você não tem permissão para apagar este endereço')
    }

    await address.destroy()

    return {
        status: true,
        message: 'Endereço apagado com sucesso!'
    }
}

// ADMIN
async function listAllAddresses() {
    // Admin vê todos os endereços
    const addresses = await Address.findAll()

    return addresses
}

async function searchAddresses(search) {
    // Admin busca endereços por critérios diversos
    if (!search || typeof search !== 'string') {
        throw new Error('Termo de busca ausente ou inválido')
    }

    const addresses = await Address.findAll({
        where: {
            [Op.or]: [
                { id: { [Op.like]: `${search}` } },
                { street: { [Op.like]: `%${search}%` } },
                { neighborhood: { [Op.like]: `%${search}%` } },
                { city: { [Op.like]: `%${search}%` } },
                { cep: { [Op.like]: `${search}` } }
            ]
        }
    })

    return addresses
}

module.exports = {
    // Usuário
    createAddress,
    readUserAddresses,
    updateAddress,
    deleteAddress,
    // Admin
    listAllAddresses,
    searchAddresses
} 