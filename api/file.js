const { file } = require('googleapis/build/src/apis/file')
const multer = require('multer')
const upload = multer({dest:'api/uploads'})
module.exports = app =>{

const save = (req, res) => {
    const meta = { ...req.body }
    console.log(upload.single('file'))
}
return {save}
}
