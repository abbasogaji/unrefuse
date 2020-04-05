const express = require("express")
const guestController = require("../controller/guest-controller")
const router = express.Router()

router.post('/api/guest/signup',  guestController.createGuest)
router.get('/api/test', (req, res, next) => {
    res.status(200).json( {
        ok : 'donee'
    })
})


module.exports = router;
