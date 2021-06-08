const router          = require('express').Router()
const User            = require('../models/user')
const logger          = require('../utils/logger')
const login           = require('../utils/login')

// Login user
router.post('/', async (req, res) => {

  // find the user from DB
  const user = await User.findOne({ username: req.body.username })

  // Login the foud user. If user is not found respond with error.
  const loggedInUser = user ? await login(user, req.body.password) : res.status(401).json({ error: 'User not found.' })

  if(loggedInUser){
    res.status(200).json(loggedInUser)
  }
  else {
    logger.error('invalid username or password')
    res.status(401).json({ error: 'Invalid username or password.' })
  }
})

module.exports = router