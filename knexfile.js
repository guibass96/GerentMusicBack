const { db } = require('./.env')

module.exports = {
	client: 'postgresql',
	connection:{
	   //database:'GerentMusicHOM',
	   database:'GerentMusicHOM2',
	   user:'postgres',
	   password:'123456'
	},
	pool: {
		min: 1,
		max: 100
	},
	migrations: {
		tableName: 'knex_migrations'
	}
};