
exports.up = function (knex, Promise) {
    return knex.schema.createTable('dados_bancarios', table => {
        table.increments('id').primary()
        table.integer('idProfessor').references('id').inTable('users').notNull()
        table.string('banco').notNull().unique()
        table.string('tipo_conta').notNull()
        table.string('agencia').notNull().unique()
        table.string('conta').notNull().unique()
       
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('dados_bancarios')
};
