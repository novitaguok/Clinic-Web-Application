const { db } = require("../../module/db")
const { encryptPass, isValid } = require("../../module/encrypt")
const { signUser } = require("../../module/auth")
const multer = require('multer')
const ejs = require('ejs')

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
        res.status(200).json({success:true, token:token, data:result[0]})      
      }else{
        res.status(200).json({success:false, message: 'password salah!'})      
      }
    }
  })
}

function update(req,res) {
  const payload = req.body
  const data = {}
  if(payload.namaLengkap){
    data['nama'] = payload.nama
  }
  if (payload.gender){
    data['gender'] = payload.gender
  }
  const date = payload.tanggal_lahir.split('/')
  if (payload.tanggal_lahir){
    data['tanggal_lahir'] = `${date[2]}-${date[0]}-${date[1]}`
  }
  if (payload.bidang){
    data['bidang'] = payload.bidang
  }
  if (payload.pengalaman){
    data['pengalaman'] = payload.pengalaman
  }
  if (payload.email){
    data['email'] = payload.email
  }
  if (payload.password){
    data['password'] = payload.password
  }
  console.log(req.user);
  db('dokter')
  .where('id_dokter', req.user.id_dokter)
  .update(data)
  .then(()=>{
    res.status(200).json({success: true, data: data, message: 'Update Berhasil!'})
  })
  .catch(error => {
    console.log(error)
    res.status(400).json({success: false, message: error})
  })
}

function getData(req,res) {
  console.log('get')
  db.from('dokter')
  .select()
  .then(result => {
    // const date = new Date(result[0].tanggal_lahir)
    // const dd = date.getDate()
    // const mm = date.getMonth
    // const yyyy = date.getFullYear
    // result[0].tanggal_lahir = dd+'-'+mm+'-'+yyyy
    console.log(result)
    res.status(200).json({success:true, message: 'Berhasil!',data: result})
  })
  .catch(error => {
    console.log(error)
    res.status(400).json({success: false, message: error})
  })
}

// function foto(req,res) {
  
// }

module.exports = {
  regis,
  login,
  update,
  getData
}