
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('data_nascimento').notNull()
        table.string('password').notNull()
        table.string('rg').notNull().unique()
        table.string('cpf').notNull().unique()
        table.string('telefone')
        table.string('instrumento')
        table.string('responsavel')
        table.string('formacao_academica')
        table.boolean('admin').defaultTo(false)
        table.boolean('professor').defaultTo(false)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};
