require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configDB = require('./config/mongodb')
const userCltr = require('./app/controller/userCltr')
const authenticateUser = require('./app/middleware/authenticateUser')
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

configDB()

//User
app.post('/api/users/register', userCltr.register)
app.post('/api/users/login', userCltr.login)
app.get('/api/users/account', authenticateUser)

app.listen(port, () => {
  console.log('Server running on port', port)
})
