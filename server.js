const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const home = require('./routing/home')
const regisUser = require('./routing/regisUser')
const backend = require('./backend/route')
const { regis } = require('./backend/handler/user')
const login = require('./routing/login')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//set up handlebars
const handlebars = require('express-handlebars')
      .create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
//set port
app.set('port', process.env.PORT || 3000)

app.use('/',express.static('public'))

//pasien
// app.get('/', home)
// app.get('/regisUser', regisUser)
// app.get('/login', login)
// app.post('/login', regis)


//dokter


//backend
app.use('/api', backend)

app.listen(app.get('port'), () => console.log('Running on port '+ app.get('port')))
