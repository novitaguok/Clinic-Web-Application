const bcrypt = require('bcrypt')

function encryptPass(password) {
  return bcrypt.hashSync(password, 10)
}

function isValid(password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}
module.exports = {
  encryptPass,
  isValid
} 