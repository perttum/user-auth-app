const router            = require('express').Router()
const User              = require('../models/user')
const hashPassword      = require('../utils/hashPassword')
const logger            = require('../utils/logger')
// const login             = require('../utils/login')

router.post('/', async (req, res) => {

  const body = req.body
  const newUser = {}

  // The posted data is already validated at client side.
  // So these body.x checks are basically just paranoia.

  body.username
    ? newUser.username = body.username
    : res.status(404).json({ error: 'Username is required to signup.' })

  body.password
    ? newUser.hash = await hashPassword(body.password)
    : res.status(404).json({ error: 'Password is required to signup.' })

  body.email
    ? newUser.email = body.email
    : res.status(404).json({ error: 'Email is required to signup.' })

  newUser.userCreated = new Date()
  const savedUser = new User(newUser)

  // savedUser is validated one more time here for uniqueness by mongoose.
  // If check fails client is sent an ugly message containing fields that
  // did not pass the check and execution ends here.
  await savedUser.save()

  // If here, everyhting went fine.
  logger.info('New user signed up: ', savedUser)

  res.status(200).json(savedUser)
})

module.exports = router