const admin = require('./admin')
const multer  = require('multer')
const path = require('path')
//const { storage } = require('googleapis/build/src/apis/storage')

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
    .get(app.api.scheduler.get)
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

    app.route('/novaclasse')
    .all(app.config.passaport.authenticate())
    .get(admin(app.api.turma.get))
    .post(admin(app.api.turma.save))

    app.route('/novaclasse/:id') 
    .all(app.config.passaport.authenticate())   
    .put(admin(app.api.turma.save))
    .delete(app.api.turma.remove)

    app.route('/mural')
    .all(app.config.passaport.authenticate())
    .get(app.api.mural.get)
    .post(app.api.mural.save)

    app.route('/mural/:id')
    .all(app.config.passaport.authenticate())
    .get(app.api.mural.getById)
    .post(app.api.mural.save)


    const storage = multer.diskStorage({

     
        destination: function(req,file,cb){
            
           cb(null,`uploads/${req.params.id}`)
        },
        filename:function(req,file,cb){
            cb(null,file.originalname + Date.now() + path.extname(file.originalname))
        }
    })
   
    const upload = multer({storage})
    app.post('/upload/:id',upload.array('files', 10),(req,res)=>{
        const reqFiles = []
        const url = req.protocol + '://' + req.get('host')
        for (var i = 0; i < req.files.length; i++) {
          reqFiles.push(url + '/uploads/'+req.params.id+'' + req.files[i].filename)
          console.log('entrei')
        }
        
    })
    
   

}