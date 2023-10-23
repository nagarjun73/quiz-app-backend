require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configDB = require('./config/mongodb')
const userCltr = require('./app/controller/userCltr')
const authenticateUser = require('./app/middleware/authenticateUser')
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

app.listen(port, () => {
  console.log('Server running on port', port)
})
