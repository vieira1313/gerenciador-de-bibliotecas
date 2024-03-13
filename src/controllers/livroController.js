const knex = require("../database/knex")

class LivroController {
    async createLivro(req, res) {
        const { title, autor, paginas, categoria } = req.body;

        await knex("livro").insert({ title, autor, paginas, categoria })
        return res.status(201).json("livro cadastrado com sucesso")
    }

    async listLivro(req, res) {
        const livro = await knex("livro")
        return res.status(201).json(livro)
    }

    async listLivroById(req, res) {
        const { livro_id } = req.params
        const livro = await knex("livro").where({ id: livro_id })
        return res.status(200).json(livro)
    }

    async updateLivro(req, res) {
        const { livro_id } = req.params
        const { title, autor, paginas, categoria } = req.body

        await knex("livro").where({ id: livro_id }).update({ title, autor, paginas, categoria })
        return res.status(200).json("livro atualizado com sucesso!")
    }

    async deleteLivro(req, res) {
        const { livro_id } = req.params
        await knex("livro").where({ id: livro_id }).delete()
        return res.status(200).json("livro deletado com sucesso!")
    }
}
module.exports = LivroController