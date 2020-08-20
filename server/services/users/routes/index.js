const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/login', UserController.find)
router.post('/register', UserController.add)
router.get('/all', UserController.getAll)

module.exports = router