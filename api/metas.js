module.exports = app =>{

    const get = (req,res)=>{
        app.db('metas_estrategias_estudo')
        .select('*')
        .then(meta => res.json(meta))
        .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('metas_estrategias_estudo')
            .where({ idAluno: req.params.id })
            .then(meta => {
               
                return res.json(meta)
            })
            .catch(err => res.status(500).send(err))
    }
    const save = (req, res) => {
        const meta = { ...req.body }
        if(req.params.id) meta.id = req.params.id
        console.log(meta)
        if(meta.id){
           console.log("entrei")
            app.db('metas_estrategias_estudo')
            .update(meta)
            .where({ id: meta.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('metas_estrategias_estudo')
            .insert(meta)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
       /* pusher.trigger('schedule', 'new-event', scheduler);
        res.json(scheduler);*/
        }
        const remove = async (req,res)=>{
            //const scheduler = { ...req.body }
            try{
            const arr = await   app.db('metas_estrategias_estudo')
                .where({ id: req.params.id }).del()
                .then(_ => res.status(204).send())
                .catch(arr => res.status(500).send(arr))
            }catch(msg) {
                res.status(500).send(msg)
            }
           
           }
return {get,save,getById,remove}
}