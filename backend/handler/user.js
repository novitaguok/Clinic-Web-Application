function regisUser(req,res) {
  const payload = req.body
  console.log(payload)
  // res.send(payload)
  res.render('home', {
    layout: 'main'
  })
}

module.exports = {
  regisUser,

}