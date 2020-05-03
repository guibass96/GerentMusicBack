exports.up = function (knex, Promise) {
    return knex.schema.createTable('treinos', table => {
        table.increments('id').primary()
        table.integer('idUsuarioCriou').references('id').inTable('users')
        table.integer('idAluno').references('id').inTable('users')
        table.string('treino')
        table.timestamp('conclusao')
        table.string('status')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('treinos')
};
