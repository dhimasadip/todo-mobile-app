const axios = require('axios')

const UserServer = axios.create({
    baseURL: 'http://localhost:3002'
})

const TodoServer = axios.create({
    baseURL: 'http://localhost:3003'
})

module.exports = { UserServer, TodoServer }