const bcrypt = require('bcrypt-nodejs')
module.exports = app =>{

    const get = (req,res)=>{
        app.db('users')
        .select('*')
        .then(user => res.json(user))
        .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .first()
            .then(user => {
               
                return res.json(user)
            })
            .catch(err => res.status(500).send(err))
    }

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    const save = (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        user.password = encryptPassword(user.password)
       // console.log(user)
        if(user.id){
           console.log(user)
            app.db('users')
            .update(user)
            .where({ id: user.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('users')
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
            const arr = await   app.db('users')
                .where({ id: req.params.id }).del()
                .then(_ => res.status(204).send())
                .catch(arr => res.status(500).send(arr))
            }catch(msg) {
                res.status(500).send(msg)
            }
           
           }
return {get,save,getById,remove}
}