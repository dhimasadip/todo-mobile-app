const { MongoClient } = require('mongodb')

const db_url = `mongodb://localhost:27017`
const db_name = process.env.DB

const client = new MongoClient(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

client.connect()

const db = client.db(db_name)

module.exports = db