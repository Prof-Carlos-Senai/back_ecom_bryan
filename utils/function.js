function gerarSlug(text) {
    return text
        .normalize("NFD")                  // separa acentos
        .replace(/[\u0300-\u036f]/g, "")   // remove acentos
        .toLowerCase()                     // tudo minúsculo
        .trim()                            // remove espaços nas pontas
        .replace(/[^a-z0-9\s-]/g, "")       // remove caracteres especiais
        .replace(/\s+/g, "-")              // troca espaços por -
        .replace(/-+/g, "-");              // remove múltiplos hífens
}

module.exports = { gerarSlug }