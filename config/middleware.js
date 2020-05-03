
const bodyParser = require('body-parser')
//requisição de outros ambientes
const cors = require('cors')

//exportando modulo com middleware de bodyParser
module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(cors())
}