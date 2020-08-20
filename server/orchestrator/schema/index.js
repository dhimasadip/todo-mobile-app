const { gql } = require('apollo-server')

const typeDefs = gql`
    scalar Date

    type User {
        _id: String
        name: String
        username: String
        password: String
    }

    type Todo {
        _id: String
        UserId: String
        title: String
        description: String
        due_date: Date
        priority: String
        status: String
    }

    input inputUser {
        name: String
        username: String
        password: String    
    }

    input inputTodo {
        UserId: String
        title: String
        description: String
        due_date: Date
        priority: String
        status: String
    }

    type Query {
        getTodo(UserId: String) : [Todo]
        getAllUser: [User]
    }
    
    type Mutation {
        getUser(username: String, password: String) : User
        addUser(newUser: inputUser) : User
        addTodo(newTodo: inputTodo) : Todo
        editTodo(status: String, id: String) : Todo
        editPriority(priority: String, id: String) : Todo
    }

`

module.exports = typeDefs