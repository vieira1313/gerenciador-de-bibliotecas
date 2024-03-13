
exports.up = (knex) => {
  return knex.schema.createTable("loans", (table) => {
    table.increments("id").primary(),
    table.integer("user_id").unsigned().index().references("id").inTable("users")
    table.integer("livro_id").unsigned().index().references("id").inTable("livro")
  })
};


exports.down = (knex) =>
 {
    return knex.schema.dropTableifExists("loans")
  
};
