const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../model/user-model')

const userCltr = {}

userCltr.register = async (req, res) => {
  const body = _.pick(req.body, ['username', 'email', 'password'])
  try {
    const usr = new User(body)
    const salt = await bcryptjs.genSalt()
    const hashedPassword = await bcryptjs.hash(body.password, salt)
    usr.password = hashedPassword
    const totalUsers = await User.countDocuments()
    if (totalUsers == 0) {
      usr.role = 'admin'
    }
    await usr.save()
    res.json(usr)
  } catch (e) {
    res.status(400).json(e)
  }
}

userCltr.login = async (req, res) => {
  const body = _.pick(req.body, ['email', 'password'])
  try {
    const foundUser = await User.findOne({ email: body.email })
    if (!foundUser) {
      res.status(400).json({ errors: "Invalid Email or Password" })
    } else {
      const checkPassword = await bcryptjs.compare(body.password, foundUser.password)
      if (!checkPassword) {
        res.status(400).json({ errors: "Incorrect Password" })
      } else {
        const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.json({ token: token })
      }
    }
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = userCltr