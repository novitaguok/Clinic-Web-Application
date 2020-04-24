const jwt = require('jsonwebtoken')
require('dotenv').config()


function signUser(user) {
  return jwt.sign(user, process.env.tokenSecret, { expiresIn: 60*30})
}

async function authenticateToken(req,res,next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log(token)
  if (token == null) res.status(200).json({success: false, message: 'No Authentication'})

  jwt.verify(token, process.env.tokenSecret, (err,user) => {
    if (err) return res.status(200).json({success: false, message: 'Authentication Expired, please relogin'})
    req.user = user
    next()
  })
}

module.exports = {
  signUser,
  authenticateToken
}