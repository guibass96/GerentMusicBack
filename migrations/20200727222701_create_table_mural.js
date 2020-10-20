exports.up = function (knex, Promise) {
    return knex.schema.createTable('mural', table => {
        table.increments('id').primary()
        table.string('link_turma').notNull()
        table.string('comentario',2000).notNull()
        table.timestamp('criacao')
        //table.integer('id_resposta').references('id').inTable('mural')
        table.integer('id_resposta')
        table.integer('usuario_id').notNull()
        table.string('usuario_name').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('mural')
};
