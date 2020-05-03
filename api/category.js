module.exports = app=>{
  
  
    const get = (req,res)=>{
        app.db('categories')
        .select('name')
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    const toTree = (categories, tree) => {
        //verifica se arvore existe, depos
        //se parentId é nullo pra colocar como primeiro
        if(!tree) tree = categories.filter(c => !c.parentId)
        //no map percorre cada elemento 
        tree = tree.map(parentNode => {
            console.log(parentNode)
            //pega filho que tem parent id igual id dos de cioma (parentId null)
            const isChild = node => node.parentId == parentNode.id
            //recursividade chamando chamando os nós com filtro para o filho
            
            parentNode.children = toTree(categories, categories.filter(isChild))
           // console.log(parentNode.children)
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }
    return {get,getTree}
}