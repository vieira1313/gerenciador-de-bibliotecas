exports.up = (knex) => {
    return knex.schema.createTable("livro", (table) => {
        table.increments('id').primary(); 
        table.string("title").notNullable();
        table.string("autor").notNullable();
        table.string("paginas").notNullable();
        table.string("categoria").notNullable();
        table.boolean("disponivel").defaultTo("true")
    }) 
};


exports.down = (knex) => {
  return knex.schema.dropTableIfExists("livro")
};