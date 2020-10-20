const bcrypt = require('bcrypt-nodejs')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
module.exports = app =>{

    const get = (req,res)=>{
        app.db('mural')
        .select('*')
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('mural')
            .where({ link_turma: req.params.id })
            .then(user => {
                return res.json(user)
            })
            .catch(err => res.status(500).send(err))
    }
    const save = (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id
       console.log(user)
        if(user.id){
            app.db('mural')
            .update(user)
            .where({ id: user.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('mural')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
       /* pusher.trigger('schedule', 'new-event', scheduler);
        res.json(scheduler);*/
        }
        const remove = async (req,res)=>{
            //const scheduler = { ...req.body }
            try{
            const arr = await   app.db('mural')
                .where({ id: req.params.id }).del()
                .then(_ => res.status(204).send())
                .catch(arr => res.status(500).send(arr))
            }catch(msg) {
                res.status(500).send(msg)
            }
           
           }
return {get,save,getById,remove}
}