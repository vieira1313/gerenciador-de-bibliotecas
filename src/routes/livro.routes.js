const {Router} = require("express")
const livroControler = require("../controllers/livroControler")
const livroControler = require("../controllers/livroController")

livroControler =  new livroController()

userRoutes.post("/livro", livroControler.createlivro )

livroRoutes.get("/livro", livroControler.listlivro)
livroRoutes.get("/livros/:livro_id", checklivroExists,  livroController.listlivroById)
livroRoutes.put("/livros/:livro_id", checklivroExists, livroController.updatelivro )
livroRoutes.delete("/livros/:livro_id", checklivroExists, livroController.deletelivro)
module.exports = livroRoutes