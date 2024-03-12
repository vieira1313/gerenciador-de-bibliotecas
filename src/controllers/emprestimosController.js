const knex = require("../database/knex")
class emprestimosController{
//Pesquisa de livros
searchLivro (req, res) {
    const {title, autor, categoria} = req.query

    if(title){
        result = livrosb.filter(livro => livro.title.includes(title))
    }
    if(autor){
        result = livrosb.filter(livro => livro.autor.includes(autor))
    }
    if(categoria){
        result = livrosb.filter(livro => livro.categoria.includes(categoria))
    }
   return res.status(200).json(result)
}
//Listagem de emprestimo de livros
 async listEmprestimos(req, res) {
    const {id} = req.params;
    const {nome} = req.headers;
    const user = users.find(user => user.nome === nome)

    if(!user){
        res.status(400).json("Usuário não cadastrado, erro 404")
    }
    req.user = user

    const livro = livrosb.find(livro => livro.id === id)

    if(livro.disponivel === true){
        const limite = user.listadeemprestimos.length >= 2
        if(limite){
            res.status(400).json("Limite Escedido!")
        }

        user.listadeemprestimos.push(livro)
        livro.disponivel = false

        return res.status(200).json("Atualizado com sucesso!")
    }
    else {
        res.status(400).json("Livro Indisponivel")
    }

}
//Devolução de Livros
async devoluçaoLivros (req, res) {
    const {id} = req.params
    const {nome} = req.headers
    const user = users.find(user => user.nome === nome)

    if(!user){
        res.status(400).json("Usuário não cadastrado, erro 404")
    }
    req.user = user

    
    const Indexlivro = user.listadeemprestimos.findIndex(livro => livro.id === id)
    const livro = livrosb.find(livro => livro.id === id)

    if(Indexlivro === -1){
        return res.status(400).json("Voce nao tem livros para devolucao")
    }
    user.listadeemprestimos.splice(Indexlivro, 1)
    livro.disponivel = true

    return res.status(200).json("Livro devolvido com sucesso!")
    }
}
module.exports = emprestimosController
