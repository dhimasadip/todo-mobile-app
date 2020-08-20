const router = require('express').Router()
const TodoController = require('../controllers/TodoController')

router.get('/todo/:UserId', TodoController.list)
router.post('/todo', TodoController.add)
router.post('/todo/:id/status', TodoController.editStatus)
router.post('/todo/:id/priority', TodoController.editPriority)

module.exports = router