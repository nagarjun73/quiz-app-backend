const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = tokenData.id
    next()
  } catch (e) {
    res.status(400).json({ errors: 'Authentication Error' })
  }
}

module.exports = authenticateUser