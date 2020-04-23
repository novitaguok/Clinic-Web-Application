const express = require('express')
const user = require('./handler/user')
const dokter = require('./handler/dokter')
const medis = require('./handler/rekamMedis')
const { authenticateToken } = require('../module/auth')

const backend = express.Router()

backend.post('/', (req,res) => { res.status(200).json({text:'helloo'}); console.log(req.body) })

//pasien
backend.post('/pasien/registrasi', user.regis)
backend.post('/pasien/login', user.login)
backend.post('/pasien/update', authenticateToken, user.update)
backend.get('/pasien', authenticateToken, user.getData)

//dokter
backend.post('/dokter/registrasi', dokter.regis)
backend.post('/dokter/login', dokter.login)
backend.post('/dokter/update', authenticateToken, dokter.update)
backend.get('/dokter/get/:id', authenticateToken, dokter.getData)

// backend.post('/dokter/foto', dokter.foto)

//rekam medis
backend.post('/medis/add', authenticateToken, medis.add)
backend.post('/medis/update/:id', authenticateToken, medis.update)
backend.get('/medis/getAll/', authenticateToken, medis.get)
backend.get('/medis/get/:id', authenticateToken, medis.getOne)




module.exports = backend
