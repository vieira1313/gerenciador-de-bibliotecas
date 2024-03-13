const {Router} = require("express")

const livroRoutes = require("./livro.routes")
const userRoutes = require("./users.routes")
const loansRoutes = require("./emprestimos.routes")

const routes = Router()

routes.use("/livro", livroRoutes)
routes.use("/users", userRoutes)
routes.use("/emprestimos", loansRoutes)

module.exports = routes