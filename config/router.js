const admin = require('./admin')
module.exports = app =>{
    app.post('/signup', app.api.users.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)
    
    app.route('/categories')
    .all(app.config.passaport.authenticate())
    .get(app.api.category.get)

    app.route('/categories/tree')
    .all(app.config.passaport.authenticate())
    .get(app.api.category.getTree)

    app.route('/agenda')
    .all(app.config.passaport.authenticate())
    .get(app.api.scheduler.get)
    .post(app.api.scheduler.save)
    
    app.route('/agenda/:id')
    .all(app.config.passaport.authenticate())
    .post(app.api.scheduler.save)

    app.route('/agenda/:id')
    .all(app.config.passaport.authenticate())
    .delete(app.api.scheduler.remove)

    app.route('/metas')
    .all(app.config.passaport.authenticate())
    .get(app.api.metas.get)
    .post(app.api.metas.save)
           
    app.route('/metas/:id')
    .all(app.config.passaport.authenticate())
    .get(app.api.metas.getById)
    .put(app.api.metas.save)
    .delete(app.api.metas.remove)

    app.route('/users')
    .all(app.config.passaport.authenticate())
    .get(admin(app.api.users.get))
    .post(admin(app.api.users.save))

    app.route('/users/:id')
    .all(app.config.passaport.authenticate())
    .get(admin(app.api.users.getById))
    .put(admin(app.api.users.save))

}