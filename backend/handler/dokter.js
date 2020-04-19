const { db } = require("../../module/db")
const { encryptPass, isValid } = require("../../module/encrypt")
const { signUser } = require("../../module/auth")

async function regisDokter(req,res) {
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
      res.status(404).json({success:false, message: 'akun tidak terdaftar!'})
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
        res.status(400).json({success:false, message: 'password salah!'})      
      }
    }
  })
}

module.exports = {
  regisDokter,
  login
}