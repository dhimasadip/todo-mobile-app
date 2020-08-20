const User = require('../models/User')

class UserController {
    static find(req, res, next) {
        const { username, password } = req.body

        User.findOne({ username, password })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

    static add(req, res, next) {
        const { username, name, password } = req.body

        User.create({ username, name, password })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }

    static getAll(req, res, next) {
        User.all()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json({ error: err })
            })
    }
}

module.exports = UserController