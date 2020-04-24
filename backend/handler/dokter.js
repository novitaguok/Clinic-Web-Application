const { db } = require("../../module/db")
const { encryptPass, isValid } = require("../../module/encrypt")
const { signUser } = require("../../module/auth")
const multer = require('multer')
const path = require('path')

async function regis(req,res) {
  const payload = req.body
  const date = payload.tanggal_lahir.split('/')
  // const hash = encryptPass(payload.password)
  const hash = payload.password
  
  const data = {
    nama : payload.nama,
    gender : payload.gender,
    tanggal_lahir : `${date[2]}-${date[0]}-${date[1]}`,
    bidang: payload.bidang,
    pengalaman: payload.pengalaman,
    email : payload.email, 
    password: hash
  }
  console.log(data)

  const search = await db.from('dokter').where('email', payload.email)
  if (search.length == 0){
    db('dokter').insert(data).then((result)=>{
      data['id_dokter'] = result[0]
      res.status(200).json({success:true, message: 'Berhasil'})      
    })
  }else{
    res.status(200).json({success:false, message: 'email telah terdaftar'})
  }
}

function login(req,res) {
  const payload = req.body
  db.from('dokter').where('email', payload.email)
  .then(result => {
    if(result.length==0){
      res.status(200).json({success:false, message: 'akun tidak terdaftar!'})
    }else{
      const data = {
        id_dokter: result[0].id_dokter,
        nama: result[0].nama,
        email: result[0].email,
        password: result[0].password
      }

      // const valid = isValid(payload.password, data.password)
      const valid = (payload.password == data.password)
      if(valid){
        // console.log(data)
        token = signUser(data)
        res.status(200).json({success:true, token:token, data:result[0], message: 'Berhasil!'})      
      }else{
        res.status(200).json({success:false, message: 'password salah!'})      
      }
    }
  })
}

function update(req,res) {
  const payload = req.body
  const date = payload.tanggal_lahir.split('/')
  const data = {
    nama : payload.nama,
    tanggal_lahir : `${date[2]}-${date[1]}-${date[0]}`,
    email : payload.email, 
    password: payload.password
  }
  // console.log(req.user);
  db('dokter')
  .where('id_dokter', req.user.id_dokter)
  .update(data)
  .then(()=>{
    res.status(200).json({success: true, data: data, message: 'Berhasil!'})
  })
  .catch(error => {
    console.log(error)
    res.status(400).json({success: false, message: error})
  })
}

function getData(req,res) {
  console.log('get')
  if(req.params.id == '0'){
    console.log('all')
    db.from('dokter')
    .select('id_dokter','nama', 'bidang', 'pengalaman')
    .then(result => {
      // const date = new Date(result[0].tanggal_lahir)
      // const dd = date.getDate()
      // const mm = date.getMonth
      // const yyyy = date.getFullYear
      // result[0].tanggal_lahir = dd+'-'+mm+'-'+yyyy
      res.status(200).json({success:true, message: 'Berhasil!',data: result})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: error})
    })
  } else if(req.params.id == '1'){
    console.log('umum')
    db.from('dokter')
    .where('bidang', 'Umum')
    .select('id_dokter','nama', 'bidang', 'pengalaman')
    .then(result => {
      // const date = new Date(result[0].tanggal_lahir)
      // const dd = date.getDate()
      // const mm = date.getMonth
      // const yyyy = date.getFullYear
      // result[0].tanggal_lahir = dd+'-'+mm+'-'+yyyy
      res.status(200).json({success:true, message: 'Berhasil!',data: result})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: error})
    })
  }else if(req.params.id == '2'){
    console.log('gigi')
    db.from('dokter')
    .where('bidang', 'Gigi')
    .select('id_dokter','nama', 'bidang', 'pengalaman')
    .then(result => {
      // const date = new Date(result[0].tanggal_lahir)
      // const dd = date.getDate()
      // const mm = date.getMonth
      // const yyyy = date.getFullYear
      // result[0].tanggal_lahir = dd+'-'+mm+'-'+yyyy
      res.status(200).json({success:true, message: 'Berhasil!',data: result})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: error})
    })
  }else if(req.params.id == '3'){
    console.log('orthopedi')
    db.from('dokter')
    .where('bidang', 'Orthopedi')
    .select('id_dokter','nama', 'bidang', 'pengalaman')
    .then(result => {
      // const date = new Date(result[0].tanggal_lahir)
      // const dd = date.getDate()
      // const mm = date.getMonth
      // const yyyy = date.getFullYear
      // result[0].tanggal_lahir = dd+'-'+mm+'-'+yyyy
      res.status(200).json({success:true, message: 'Berhasil!',data: result})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: error})
    })
  }else if(req.params.id == '4'){
    console.log('gigi')
    db.from('dokter')
    .where('bidang', 'THT')
    .select('id_dokter','nama', 'bidang', 'pengalaman')
    .then(result => {
      // const date = new Date(result[0].tanggal_lahir)
      // const dd = date.getDate()
      // const mm = date.getMonth
      // const yyyy = date.getFullYear
      // result[0].tanggal_lahir = dd+'-'+mm+'-'+yyyy
      res.status(200).json({success:true, message: 'Berhasil!',data: result})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: error})
    })
  }else{
    db.from('dokter')
    .where('id_dokter', req.user.id_dokter)
    .select()
    .then(result => {
      const date = new Date(result[0].tanggal_lahir)
      const dd = String(date.getDate()).padStart(2, "0")
      const mm = String(date.getMonth()+1).padStart(2, "0")
      const yyyy = date.getFullYear()
      result[0].tanggal_lahir = dd+'/'+mm+'/'+yyyy
      res.status(200).json({success:true, data: result[0]})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: 'error'})
    })
  }
}

function foto(req,res) {
  console.log('==============')
  console.log(req)
  console.log('=============')
  // const storage = multer.diskStorage({
  //   destination: '../../public/images/dokter',
  //   filename: function (req,file,cb) {
  //     cb(null,'1' + path.extname(file.originalname))
  //   }
    
  // })
  // const upload = multer({
  //   storage: storage
  // }).single('foto')
  
  // upload(req,res, (err) =>{
  //   if(err){
  //     res.status(400).json({success: false, message: err})
  //   }else{
  //     console.log(req.file)
  //     res.status(200).json({success:true, message: 'Berhasil!'})
  //   }
  // })
}

module.exports = {
  regis,
  login,
  update,
  getData,
  foto
}