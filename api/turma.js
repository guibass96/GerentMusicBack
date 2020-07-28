module.exports = app=>{
    var nodemailer = require('nodemailer');

    var $usuario = 'guilhermebatista612@gmail.com';
    var $senha = 'aqnh pwdl cwbe zlsa'; 
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: $usuario,
            pass: $senha
        }
    });
    
    var $destinatario = 'guilherme-batista2011@live.com';
    
 
      const get = (req,res) =>{
          const event = { ...req.body }
          if(req.params.id) event.id = req.params.id
          if(event.id){
              app.db('turma')
              .select('*')
              .where({ id: event.id })
              .then(agenda => res.json(agenda))
              .catch(err => res.status(500).send(err))
          }else{
              app.db('turma')
              .select('*')
              .then(agenda => res.json(agenda))
              .catch(err => res.status(500).send(err))
          }
          
      }
      
      const save = (req, res) => {
          const scheduler = { ...req.body }
          if(req.params.id) scheduler.id = req.params.id
          
          if(scheduler.id){
            
              app.db('turma')
              .update({titulo:scheduler.titulo,disciplina:scheduler.disciplina})
              .where({ id: scheduler.id })
              .then(_ => res.status(204).send())
              .catch(err => res.status(500).send(err))
          }else{
              console.log(scheduler)
              app.db('turma')
              .insert(scheduler)
              .then(_ => {res.status(204).send()
                var mailOptions = {
                    from: $usuario,
                    to: $destinatario,
                    subject: 'Gerent School',
                    html: `Olá, você foi adicionado a uma nova turma <strong>${scheduler.titulo}</strong><br>`
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });
            })
              .catch(err => res.status(500).send(err))
          }
         /* pusher.trigger('schedule', 'new-event', scheduler);
          res.json(scheduler);*/
          }
  
         const remove = async (req,res)=>{
          //const scheduler = { ...req.body }
          try{
              console.log(req.params.id)
          const arr = await  app.db('turma')
              .where({ id: req.params.id }).del()
              .then(_ => res.status(204).send())
              .catch(arr => res.status(500).send(arr))
          }catch(msg) {
              res.status(500).send(msg)
          }
         
         }
          return {get,save,remove}
      }
  
      
  