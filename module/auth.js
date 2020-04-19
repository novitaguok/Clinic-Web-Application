const jwt = require('jsonwebtoken')
require('dotenv').config()


function signUser(user) {
  return jwt.sign(user, process.env.tokenSecret, { expiresIn: 60*15})
}

async function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (token == null) res.sendStatus(401)

  jwt.verify(token, process.env.tokenSecret, (err,user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

module.exports = {
  signUser,
  authenticateToken
}