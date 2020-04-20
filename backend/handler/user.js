const { db } = require("../../module/db")
const { encryptPass, isValid } = require('../../module/encrypt')
const { signUser } = require("../../module/auth")

async function regis(req,res) {
  const payload = req.body
  const date = payload.tanggal_lahir.split('/')
  // const hash = encryptPass(payload.password)
  const hash = payload.password
  const data = {
    nama : payload.nama,
    gender : payload.gender,
    tanggal_lahir : `${date[2]}-${date[0]}-${date[1]}`,
    email : payload.email, 
    password: hash
  }
  const search = await db.from('pasien').where('email', payload.email)
  if (search.length == 0){
    db('pasien').insert(data).then((result)=>{
      data['id_user'] = result[0]
      res.status(200).json({success:true, message: 'Berhasil'})      
    })
  }else{
    res.status(200).json({success:false, message: 'email telah terdaftar'})
  }
}

function login(req,res) {
  const payload = req.body
  console.log(payload)
  db.from('pasien').where('email', payload.email)
  .then(result => {
    console.log(result)
    if(result.length==0){
      res.status(404).json({success:false, message: 'akun tidak terdaftar!'})
    }else{
      const data = {
        id_pasien: result[0].id_pasien,
        nama: result[0].nama,
        email: result[0].email,
        password: result[0].password
      }
      // const valid = isValid(payload.password, data.password)
      const valid = (payload.password == data.password)
      if(valid){
        console.log(data)
        token = signUser(data)
        res.status(200).json({success:true, token:token, data:result[0], message: 'Berhasil!'})      
      }else{
        res.status(400).json({success:false, message: 'password salah!'})      
      }
    }
  })
}

function update(req,res) {
  const payload = req.body
  const data = {}
  if(payload.namaLengkap){
    data['nama'] = payload.namaLengkap
  }
  if (payload.alamat){
    data['alamat'] = payload.alamat
  }
  if (payload.tempatLahir){
    data['tempat_lahir'] = payload.tempatLahir
  }
  if (payload.tanggalLahir){
    data['tanggal_lahir'] = payload.tanggalLahir
  }
  if (payload.email){
    data['email'] = payload.email
  }
  if (payload.password){
    data['password'] = encryptPass(payload.password)
  }
  console.log(req.user);
  db('pasien')
  .where('id_pasien', req.user.id_pasien)
  .update(data)
  .then(()=>{
    res.status(200).json({success: true, data: data})
  })
  .catch(error => {
    console.log(error)
  })
}

function getData(req,res) {
  console.log(req.user)
  db.from('pasien')
  .where('id_pasien', req.user.id_pasien)
  .select()
  .then(result => {
    res.status(200).json({success:true, data: result})
  })
}

module.exports = {
  regis,
  login,
  update,
  getData
}