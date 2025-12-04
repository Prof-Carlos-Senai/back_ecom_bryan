function isAdminMiddleware(req, res, next) {
    if (!req.user) {
        console.log('[ADMIN MIDDLEWARE] - Usuário não autenticado!')
        return res.status(401).json({ erro: 'Usuário não autenticado' })
    }

    if (!req.user.access_level || (req.user.access_level.toUpperCase() !== 'ADMIN' && req.user.access_level.toUpperCase() !== 'OWNER')) {
        console.log('[ADMIN MIDDLEWARE] - Usuário não é administrador!')
        return res.status(403).json({ erro: 'Acesso permitido somente para administradores' })
    }

    console.log('[ADMIN MIDDLEWARE] - Acesso autorizado!')
    return next()
}

function isOwnerMiddleware(req, res, next) {

    if (!req.user) {
        console.log('[OWNER MIDDLEWARE] - Usuário não autenticado!')
        return res.status(401).json({ erro: 'Usuário não autenticado' })
    }

    if (!req.user.access_level || req.user.access_level.toUpperCase() !== 'OWNER') {
        console.log('[OWNER MIDDLEWARE] - Usuário não é o Proprietário!')
        return res.status(403).json({ erro: 'Acesso permitido somente para o Proprietário!' })
    }

    console.log('[OWNER MIDDLEWARE] - Acesso autorizado!')
    return next()
}

module.exports = { isAdminMiddleware, isOwnerMiddleware };
