const { db } = require("../../module/db")

function add(req,res) {
  const data = {
    id_dokter: req.body.id_dokter,
    id_pasien: req.user.id_pasien,
  }
  db('rekam_medis').insert(data).then((result)=>{
    res.status(200).json({success:true, message: 'Berhasil'})      
  })
}

async function update(req,res) {
  
  const payload = req.body
  console.log(payload)
  console.log(req.params.id)
  switch (req.params.id) {
    case '0':
      console.log('nol')
      const myData = {
        diagnosa: payload.diagnosa
      }
      db('rekam_medis').update(myData)
      .where('id_Rekam_medis', Number(payload.id_rekam_medis))
      .then(result => {
        res.status(200).json({success: true, data: myData, message: 'Berhasil!'})
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({success: false, message: error})
      })
      break;
    case '1':
      const dataMedis = await db.from('rekam_medis').where('id_pasien', req.user.id_pasien).select()
      const id = dataMedis.length - 1 
      console.log('masuk')
      const id_medis = dataMedis[id].id_rekam_medis
      const data= {
        tinggi_badan: payload.tinggi_badan,
        berat_badan: payload.berat_badan,
        keluhan: payload.keluhan
      }
      db('rekam_medis')
      .update(data)
      .where('id_rekam_medis', id_medis)
      .then(()=>{
        res.status(200).json({success: true, data: data, message: 'Berhasil!'})
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({success: false, message: error})
      })
      break;
  }
}

function get(req,res) {
  console.log(req.user)
  if(req.user.id_dokter){
    db.from('rekam_medis')
    .join('pasien', 'pasien.id_pasien', 'rekam_medis.id_pasien')
    .where('id_dokter', req.user.id_dokter)
    // .select('id_rekam_medis','id_dokter','id_pasien','tinggi_badan','berat_badan','keluhan','diagnosa','')
    .select('id_rekam_medis','nama','gender','tanggal_lahir','email','diagnosa','keluhan')
    .then(result => {
      result.map((data,index)=>{
        const date = new Date(data.tanggal_lahir)
        const dd = String(date.getDate()).padStart(2, "0")
        const mm = String(date.getMonth()+1).padStart(2, "0")
        const yyyy = date.getFullYear()
        data.tanggal_lahir = dd+'/'+mm+'/'+yyyy
      })
      console.log(result)
      res.status(200).json({success: true, data: result, message: 'Berhasil!'})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: error})
    })
  }else{
    console.log('B')
    db.from('rekam_medis')
    .join('dokter', 'dokter.id_dokter', 'rekam_medis.id_dokter')
    .where('rekam_medis.id_pasien', req.user.id_pasien)
    // .select('id_rekam_medis','id_dokter','id_pasien','tinggi_badan','berat_badan','keluhan','diagnosa','')
    .select('id_rekam_medis','nama','gender','tanggal_lahir','email','diagnosa','keluhan')
    .then(result => {
      result.map((data,index)=>{
        const date = new Date(data.tanggal_lahir)
        const dd = String(date.getDate()).padStart(2, "0")
        const mm = String(date.getMonth()+1).padStart(2, "0")
        const yyyy = date.getFullYear()
        data.tanggal_lahir = dd+'/'+mm+'/'+yyyy
      })
      console.log(result)
      res.status(200).json({success: true, data: result, message: 'Berhasil!'})
    })
    .catch(error => {
      console.log(error)
      res.status(400).json({success: false, message: error})
    })
  }
}

function getOne(req,res) {
  db.from('rekam_medis')
    .join('pasien', 'pasien.id_pasien', 'rekam_medis.id_pasien')
    .where('id_rekam_medis', req.params.id)
    .select('id_rekam_medis','rekam_medis.id_dokter','rekam_medis.id_pasien','tinggi_badan','berat_badan','keluhan','diagnosa','nama','gender','tanggal_lahir','email')
    .then(result => {
      result.map((data,index)=>{
        const date = new Date(data.tanggal_lahir)
        const dd = String(date.getDate()).padStart(2, "0")
        const mm = String(date.getMonth()+1).padStart(2, "0")
        const yyyy = date.getFullYear()
        data.tanggal_lahir = dd+'/'+mm+'/'+yyyy
      })
      console.log(result)
      res.status(200).json({success: true, data: result[0], message: 'Berhasil!'})
    })
}

module.exports = {
  add,
  update,
  get,
  getOne
}