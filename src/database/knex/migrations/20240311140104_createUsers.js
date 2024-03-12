xports.up = (knex) => {
    return knex.schema.createTable("users", (table) => {
        table.increments('id').primary(); 
        table.string("nome").notNullable();
        table.string("email").notNullable();
        table.string("telefone").notNullable();
        table.boolean("isAdmin").defaultTo("false")
    }) 
};


exports.down = (knex) => {
  return knex.schema.dropTableIfExists("users")};