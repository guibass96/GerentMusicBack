exports.up = function (knex, Promise) {
    return knex.schema.createTable('plano_de_acao', table => {
        table.increments('id').primary()
        table.integer('idUsuarioCriou').references('id').inTable('users')
        table.integer('idAluno').references('id').inTable('users')
        table.string('treinoA')
        table.string('treinoB')
        table.string('treinoC')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('plano_de_acao')
};
