function home(req,res) {
  res.render('home', {
    layout: 'main'
  })
}

module.exports= home