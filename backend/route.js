const express = require('express')
const user = require('./handler/user')
const dokter = require('./handler/dokter')
const { authenticateToken } = require('../module/auth')

const backend = express.Router()

backend.post('/', (req,res) => { res.status(200).json({text:'helloo'}); console.log(req.body) })

//pasien
backend.post('/pasien/registrasi', user.regis)
backend.post('/pasien/login', user.login)
backend.post('/pasien/update', authenticateToken, user.update)
backend.get('/pasien', authenticateToken, user.getData)

//dokter
backend.post('/dokter/registrasi', dokter.regisDokter)
backend.post('/dokter/login', dokter.login)

module.exports = backend
