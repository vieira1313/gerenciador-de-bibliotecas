const {Router} = require("express")
const UserController = require("../controllers/UserController")

userController =  new UserController()

userRoutes.post("/users", userController.createUser )

userRoutes.get("/users", userController.listUsers)
userRoutes.get("/users/:user_id", checkUserExists,  userController.listUserById)

userRoutes.put("/users/:user_id", checkUserExists, userController.updateUser )
userRoutes.patch("/users/adimin/:user_id", checkUserExists, userController.updateUserAdmin )

userRoutes.delete("/users/:user_id", checkUserExists, userController.deleteUser)
module.exports = userRoutes