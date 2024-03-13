const {Router} = require("express")

const LivroController = require("../controllers/LivroController")

const livroRoutes = Router()
const livroController =  new LivroController()

livroRoutes.post("/", livroController.createLivro )

livroRoutes.get("/", livroController.listLivro)
livroRoutes.get("/:livro_id",  livroController.listLivroById)
livroRoutes.put("/:livro_id", livroController.updateLivro )
livroRoutes.delete("/:livro_id", livroController.deleteLivro)
module.exports = livroRoutes