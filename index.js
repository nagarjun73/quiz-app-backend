require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configDB = require('./config/mongodb')
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

configDB()

app.listen(port, () => {
  console.log('Server running on port', port)
})
