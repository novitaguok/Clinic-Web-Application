const express = require('express')
const { regisUser } = require('./handler/user')

const backend = express.Router()

//back-end routing
backend.post('/regisUser', regisUser)

module.exports = backend
