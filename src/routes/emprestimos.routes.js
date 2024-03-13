const {Router} = require('express')
const EmprestimosController = require('../controllers/EmprestimosController')

const loansRoutes = Router()
const emprestimosController = new EmprestimosController()


loansRoutes.post("/:user_id/:livro_id",emprestimosController.searchLivro)
loansRoutes.get("/:user_id",emprestimosController.listEmprestimos)
loansRoutes.get("/total/:user_id",emprestimosController.totalLivrosEmprestados)
loansRoutes.patch("/devolucao/:user_id/:livro_id",emprestimosController.devoluçaoLivros)

module.exports = loansRoutes