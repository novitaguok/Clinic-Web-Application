const knex = require('knex')
require('dotenv').config()
const { host, name, password} = process.env

const db = knex({
  client: 'mysql',
  connection: {
    host : host,
    user : name,
    password : password,
    database : name
  }
});

module.exports = {
  db
}