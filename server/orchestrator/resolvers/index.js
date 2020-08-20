const { UserServer, TodoServer } = require('../config/axios')
const { GraphQLScalarType } = require('graphql')

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value)
        },
        serialize(value) {
            return new Date(value).toISOString()
        },
        parseLiteral(ast) {
            return new Date(ast.value)
        },
    }),
    Query: {
        getTodo: (_, args) => {
            const { UserId } = args

            return TodoServer.get(`/todo/${UserId}`)
                .then(({ data }) => data)
                .catch(err => err)
        },
        getAllUser: () => {
            return UserServer.get('/all')
                .then(({ data }) => data)
                .catch(err => err)
        }
    },
    Mutation: {
        getUser: (_, args) => {
            const { username, password } = args

            return UserServer.post('/login', { username, password })
                .then(({ data }) => data)
                .catch(err => err)

        },
        addUser: (_, args) => {
            const { username, name, password } = args.newUser

            return UserServer.post('/register', { username, name, password })
                .then(({ data }) => data['ops'][0])
                .catch(err => err)
        },
        addTodo: (_, args) => {
            let { UserId, title, description, due_date, priority, status } = args.newTodo

            due_date = new Date(due_date)

            return TodoServer.post('/todo', { UserId, title, description, due_date, priority, status })
                .then(({ data }) => data['ops'][0])
                .catch(err => err)
        },
        editTodo: (_, args) => {
            const { status, id } = args

            return TodoServer.post(`/todo/${id}/status`, { status })
                .then(({ data }) => data)
                .catch(err => err)
        },
        editPriority: (_, args) => {
            const { priority, id } = args

            return TodoServer.post(`/todo/${id}/priority`, { priority })
                .then(({ data }) => data)
                .catch(err => err)
        },
    }
}

module.exports = resolvers