
exports.up = function (knex, Promise) {
    return knex.schema.createTable('turma', table => {
        table.increments('id').primary()
        table.string('titulo')
        table.string('professor')
        table.string('aluno')
        table.string('color')
        table.string('linkTurma')
        table.string('disciplina')      
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('turma')
};
