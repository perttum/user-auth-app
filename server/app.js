const express             = require('express')
require('express-async-errors')
const mongoose            = require('mongoose')
const config              = require('./utils/config')

const app = express()

app.use(express.json())

mongoose.connect(config.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true })

// Middleware:
const middleware    = require('./utils/middleware')

// Extract and check token on request (.ie is there a user logged in) everytime using /private/* routes
app.use('/api/private', middleware.getToken)

// Routes
const auth            = require('./controllers/auth')
const signup          = require('./controllers/signup')
const forgotPassword  = require('./controllers/forgotpassword')
const users           = require('./controllers/users')

app.use('/api/auth', auth)
app.use('/api/signup', signup)
app.use('/api/forgot', forgotPassword)
app.use('/api/private/users', users)

const path = require('path')
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(middleware.unknowEndPoint)
app.use(middleware.errorHandler)

module.exports = app