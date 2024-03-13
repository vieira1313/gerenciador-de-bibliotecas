const knex = require("../database/knex")

class UserController {
  async createUser(req, res) {
    const { nome, email, telefone } = req.body

    await knex("users").insert({ nome, email, telefone })
    return res.status(201).json("Usuário cadastrado com sucesso")
  }

  async listUsers(req, res) {
    const users = await knex("users")
    return res.status(200).json(users)
  }

  async listUserById(req, res) {
    const { user_id } = req.params
    const user = await knex("users").where({ id: user_id })
    return res.status(200).json(user)
  }

  async updateUser(req, res) {
    const { user_id } = req.params
    const { nome, email, telefone } = req.body

    await knex("users").where({ id: user_id }).update({ nome, email, telefone })
    return res.status(200).json("usuario atualizado com sucesso!")
  }

  async updateUserAdmin(req, res) {
    const { user_id } = req.params

    await knex("users").where({ id: user_id }).update({ isAdmin: true })
    return res.status(200).json("usuário agora e um adiministrador!")
  }

  async deleteUser(req, res) {
    const { user_id } = req.params
    await knex("users").where({ id: user_id }).delete()
    return res.status(200).json("usuario deletado com sucesso!")
  }

}
module.exports = UserController