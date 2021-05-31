const router            = require('express').Router()
const User              = require('../models/user')
const hashPassword      = require('../utils/hashPassword')
const logger            = require('../utils/logger')
// const login             = require('../utils/login')

router.post('/', async (req, res) => {

  const body = req.body
  const newUser = {}

  body.username
    ? newUser.username = body.username
    : res.status(404).json({ error: 'Username is required to signup.' })

  body.password
    ? newUser.hash = await hashPassword(body.password)
    : res.status(404).json({ error: 'Password is required to signup.' })

  body.email
    ? newUser.email = body.email
    : res.status(404).json({ error: 'Email is required to signup.' })

  const savedUser = new User(newUser)
  await savedUser.save()

  // await login(savedUser, body.password)
  logger.info('New user signed up: ', savedUser)

  res.status(200).json(savedUser)
})

module.exports = router