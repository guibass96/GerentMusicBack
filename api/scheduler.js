module.exports = app=>{
  /*  const  pusher = new Pusher({
        appId: '967004',
        key: 'ae6ab63bcd59f4609299',
        secret: '3d85d06fde1ab39702b0',
        cluster: 'us2',
        encrypted: true
      });*/
    const get = (req,res)=>{
        app.db('agenda')
        .select('*')
        .then(agenda => res.json(agenda))
        .catch(err => res.status(500).send(err))
    }
    
    const save = (req, res) => {
        const scheduler = { ...req.body }
        if(req.params.id) scheduler.id = req.params.id
        
        if(scheduler.id){
           console.log("entrei")
            app.db('agenda')
            .update(scheduler)
            .where({ id: scheduler.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }else{
            app.db('agenda')
            .insert(scheduler)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
       /* pusher.trigger('schedule', 'new-event', scheduler);
        res.json(scheduler);*/
        }

       const remove = async (req,res)=>{
        //const scheduler = { ...req.body }
        try{
        const arr = await   app.db('agenda')
            .where({ id: req.params.id }).del()
            .then(_ => res.status(204).send())
            .catch(arr => res.status(500).send(arr))
        }catch(msg) {
            res.status(500).send(msg)
        }
       
       }
        return {get,save,remove}
    }

    
