const express             = require('express')
require('express-async-errors')
const mongoose            = require('mongoose')
const config              = require('./utils/config')

const app = express()

app.use(express.json())

mongoose.connect(config.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// Routes
const example = require('./controllers/example')
app.use('/api/example', example)

const path = require('path')
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

module.exports = app