function regisUser(req,res) {
  res.render('regisUser', {
    layout: 'main',
    nama: "Alif",
    dokter: false,
    pasien: true,
  })
}

module.exports = regisUser