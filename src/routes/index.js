const {Router} = require("express")
const livroRoutes = require("./livro.routes")
const usersRoutes = require("./users.routes")

const routes = Router()

routes.use("/", livroRoutes)
routes.use("/", usersRoutes)

module.exports = routes