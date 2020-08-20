const Todo = require('../models/Todo')

class TodoController {
    static list(req, res, next) {
        const { UserId } = req.params

        Todo.find(UserId)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

    static add(req, res, next) {
        const { UserId, title, description, due_date, priority, status } = req.body

        Todo.create({ UserId, title, description, due_date, priority, status })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

    static editStatus(req, res, next) {
        const { status } = req.body
        const { id } = req.params

        Todo.updateStatus({ status, id })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

    static editPriority(req, res, next) {
        const { priority } = req.body
        const { id } = req.params

        Todo.updatePriority({ priority, id })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }
}

module.exports = TodoController