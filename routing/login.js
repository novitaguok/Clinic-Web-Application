function login(req,res) {
  res.render('login', {
    layout: 'main',
  })
}

module.exports = login