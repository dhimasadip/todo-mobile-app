const db = require('../config/mongo')

const User = db.collection(`${process.env.USER_COLLECTION}`)

class UserModel {
    static findOne({ username, password }) {
        return User.findOne({ username, password })
    }

    static create(newUser) {
        return User.insertOne(newUser)
    }

    static all() {
        return User.find().toArray()
    }
}

module.exports = UserModel