const multer = require('multer')
const storage = multer.diskStorage({
    destination: '../public/images',
    filename:(req,file,cb)=>{
      cb(null,file.originalname)
    }
  })

const upload = multer({
    dest: '../public/images',
    limits:{fileSize:2000000}, //en bytes (2MB)
    fileFilter:(req,file,cb)=>{
     const fileTypes = /jpg||jpeg||png/
     const mimetype =fileTypes.test(file.mimetype)
     const extname= fileTypes.test(path.extname(file.originalname))
     if(mimetype && extname){
        return cb(null,true)
     }
     cb("Error: File must be a valid image")
    },
    storage
  }).single('nombredelinput')

module.exports = upload