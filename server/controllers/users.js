const router = require('express').Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
  const allUsers = await User.find({})
  res.status(200).json(allUsers)
})

module.exports = router