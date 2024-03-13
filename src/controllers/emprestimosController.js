const knex = require("../database/knex")
class EmprestimosController {
    
    //Pesquisa de livros
   async searchLivro(req, res) {
        const {user_id, livro_id} = req.params

        const livro = await knex("livro").where({id: livro_id}).first()
        const user = await knex("users").where({id: user_id}).first()
        
        if(!livro) {
            return res.status(400).json("livro não encontrado!")
        }
        if(!user) {
            return res.status(400).json("usuario não encontrado!")
        }

        await knex("loans").insert({user_id, livro_id})
        await knex("livro").where({id: livro_id}).update({disponivel: false})

        return res.status(200).json("emprestimo realizado com sucesso!")
    }
    //Listagem de emprestimo de livros
    async listEmprestimos(req, res) {
        const {user_id} = req.params

        const loans = await knex("loans")
        .where({user_id})
        .innerJoin('livro', 'livro_id', 'loans.livro_id')
        .select('livro.title', 'livro.autor', 'livro.paginas')

        return res.status(200).json(loans)

    }

    async totalLivrosEmprestados(req, res) {
        const {user_id} = req.params

        const [tatal] = await knex('loans').where({user_id}).count({livro: 'livro_id'})
        return res.status(200).json(tatal)

    }

    //Devolução de Livros
    async devoluçaoLivros(req, res) {
        const {user_id, livro_id} = req.params

        const livro = await knex("livro").where({id: livro_id}).first()
        const user = await knex("users").where({id: user_id}).first()
        
        if(!livro) {
            return res.status(400).json("livro não encontrado!")
        }
        if(!user) {
            return res.status(400).json("usuario não encontrado!")
        }
        const [loan] = await knex("loans").where({user_id})

        const bookId = loan.livro_id

        if(bookId == livro_id) {
            await knex("livro").where({id: livro_id}).update({disponivel:true})

            return res.status(200).json("livro devolvido com sucesso!")
        }
    return res.status(400).json("operação não realizada!")
    }
}
module.exports = EmprestimosController
