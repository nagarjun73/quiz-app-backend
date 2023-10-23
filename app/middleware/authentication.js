const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers['authorization']
    const tokenData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = tokenData
    next()
  } catch (e) {
    res.status(401).json({ errors: 'Authentication Error' })
  }
}

const authorizeUser = (role) => {
  return function (req, res, next) {
    if (role.includes(req.user)) {
      next()
    } else {
      res.status(403).json({ errors: "you are not permitted to access this route" })
    }
  }

}

module.exports = { authenticateUser, authorizeUser }