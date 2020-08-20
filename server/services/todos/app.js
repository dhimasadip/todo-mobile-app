require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 3003

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)

app.listen(port, _=> console.log(`Todo Service running at: http://localhost:${port}`))