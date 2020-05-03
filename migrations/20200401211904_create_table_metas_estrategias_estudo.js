exports.up = function (knex, Promise) {
    return knex.schema.createTable('metas', table => {
        table.increments('id').primary()
        table.integer('idUsuarioCriou').references('id').inTable('users')
        table.integer('idAluno').references('id').inTable('users')
        table.string('pratica')
        table.string('objetivos')
        table.string('descricao',1000)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('metas')
};
