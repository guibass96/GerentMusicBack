const Express = require('express')
const consign = require('consign')
const app = Express()
const db = require('./config/db')
app.db = db

consign()
.then('./config/passaport.js')
//.then('./config/admin.js')
.then('./config/middleware.js')
.then('./api')
.then('./config/router.js')
.into(app)

app.listen(4000,()=>{
    console.log("porta 4000 em Pé")
})


