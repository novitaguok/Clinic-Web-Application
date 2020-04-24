const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const backend = require('./backend/route')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//set port
app.set('port', process.env.PORT || 3000)

app.use('/',express.static('public'))

//backend
app.use('/api', backend)

app.listen(app.get('port'), () => console.log('Running on port '+ app.get('port')))
