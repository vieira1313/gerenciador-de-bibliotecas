const {Router} = require("express")

const UserController = require("../controllers/UserController")

const userRoutes = Router()
const userController =  new UserController()

userRoutes.post("/", userController.createUser )

userRoutes.get("/", userController.listUsers)
userRoutes.get("/:user_id",  userController.listUserById)

userRoutes.put("/:user_id", userController.updateUser )
userRoutes.patch("/adimin/:user_id", userController.updateUserAdmin )

userRoutes.delete("/:user_id", userController.deleteUser)
module.exports = userRoutes