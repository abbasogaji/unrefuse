const express = require("express")
const multer  = require('multer')
const authorizationGuard = require("../middleware/auth/isAuth.mware") 
const garbageController = require("../controller/garbage-controller")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/garbage-images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+'-'+file.originalname)
    },

})

function fileFilter (req, file, cb) {
    if(
        file.mimetype == 'image/png'
        || file.mimetype == 'image/jpg'
        || file.mimetype == 'image/jpeg'
    ){
        cb(null, true)
    }else{
        cb(null, false)
    }
  
  }

const upload = multer({ storage : storage, fileFilter: fileFilter})
const router = express.Router()

// router.post('/api/garbage/new', authorizationGuard, upload.single('image'), garbageController.createGarbage)
router.post('/api/garbage/new', upload.single('image'), garbageController.createGarbage)
router.post('/api/mobile/garbage/new', authorizationGuard, upload.single('image'), garbageController.createGarbage)

router.get('/api/garbage/all', garbageController.getAllGarbages)
router.get('/api/garbage/find/:id', garbageController.getGarbageById)
router.put('/api/garbage/edit/:id', garbageController.updateGarbageById)
router.delete('/api/garbage/:id/delete', garbageController.deleteGarbageById)

module.exports = router