require('dotenv').config()

let PORT
let DB_HOST
const EMAIL = process.env.EMAIL
const EMAIL_PASS = process.env.EMAIL_PASS

const SECRET = process.env.SECRET

switch(process.env.NODE_ENV){

case 'development':
  DB_HOST = process.env.DEV_DB_HOST
  PORT = process.env.LOCAL_PORT
  break

  // case 'production':

default:
  DB_HOST = process.env.DEV_DB_HOST
  PORT = process.env.LOCAL_PORT
  break
}

module.exports = {
  PORT,
  DB_HOST,
  EMAIL,
  EMAIL_PASS,
  SECRET
}