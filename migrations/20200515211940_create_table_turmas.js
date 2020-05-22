
exports.up = function (knex, Promise) {
    return knex.schema.createTable('turma', table => {
        table.increments('id').primary()
        table.string('titulo').notNull()
        table.string('professor').notNull().unique()
        table.string('aluno').notNull()
        
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('turma')
};