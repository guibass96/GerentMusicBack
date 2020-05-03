exports.up = function (knex, Promise) {
    return knex.schema.createTable('agenda', table => {
        table.increments('id').primary()
        table.integer('idUsuarioCriou').references('id').inTable('users')
        table.timestamp('start')
        table.timestamp('end')
        table.string('details',1000)
        table.string('name')
        table.string('color')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('agenda')
};
