const knex = require("../database/knex");

async function checklivroExists(req, res, next) {
    const {livro_id} = req.params
    const [livro] = await knex("livros").where({id: livro_id})

    if(!livro) {
        return res.status(400).json("livro não encontrado")
    }
    next()
}

module.exports = checklivroExists