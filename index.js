require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configDB = require('./config/mongodb')
const userCltr = require('./app/controller/userCltr')
const tagCltr = require('./app/controller/tagCltr')
const { authenticateUser, authorizeUser } = require('./app/middleware/authentication')
const { userRegistrationSchema, userLoginSchema } = require('./app/helpers/userValidationSchema')
const { checkSchema } = require('express-validator')
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())

configDB()

//User
app.post('/api/users/register', checkSchema(userRegistrationSchema), userCltr.register)
app.post('/api/users/login', checkSchema(userLoginSchema), userCltr.login)
app.get('/api/users/account', authenticateUser, userCltr.account)

//Tags
app.post('/api/tags/create', authenticateUser, authorizeUser(['admin']), tagCltr.create)

app.listen(port, () => {
  console.log('Server running on port', port)
})
