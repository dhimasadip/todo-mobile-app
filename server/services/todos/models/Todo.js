const { ObjectID } = require('mongodb')
const db = require('../config/mongo')

const Todo = db.collection(`${process.env.COLLECTION_NAME}`)

class TodoModel {
    static find(UserId) {
        return Todo.find({ UserId }).toArray()
    }

    static create(newTodo) {
        return Todo.insertOne(newTodo)
    }

    static updateStatus({ status, id }) {
        return Todo.updateOne({ "_id": ObjectID(id) }, { $set: { "status": status } })
    }

    static updatePriority({ priority, id }) {
        return Todo.updateOne({ "_id": ObjectID(id) }, { $set: { "priority": priority } })
    }
}

module.exports = TodoModel