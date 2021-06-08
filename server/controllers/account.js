const router          = require('express').Router()
const logger          = require('../utils/logger')
const User            = require('../models/user')
const hashPassword    = require('../utils/hashPassword')
const config          = require('../utils/config')
const jwt             = require('jsonwebtoken')

// Update user info or password
router.put('/:id', async (req, res) => {
  const body = req.body

  let userToUpdate
  let updatedUser

  if(body.password){
    userToUpdate = await User.findById(req.params.id)
    logger.info(`Updating password of: ${userToUpdate}`)

    userToUpdate
      ? userToUpdate.hash = await hashPassword(body.password)
      : res.status(404).json({ error: 'Couldn\'t find user for updating password' })

    updatedUser = await userToUpdate.save({ new: true })
    logger.info(`Updated password for user: ${updatedUser}`)

  } else {
    updatedUser = await User.findByIdAndUpdate(req.params.id, body, { new: true })
    logger.info(`Updated user info of: ${updatedUser}`)
  }
  if(updatedUser){
    // User for token creation
    const userForToken = {
      username: updatedUser.username,
      id: updatedUser._id
    }

    // Create token with jsonwebtoken
    const token = jwt.sign(userForToken, config.SECRET)

    const loggedInUser = {
      token,
      username: updatedUser.username,
      email: updatedUser.email,
      userCreated: updatedUser.userCreated,
      id: updatedUser._id
    }
    res.status(200).json(loggedInUser)
  } else {
    res.status(404).json({ error: 'Couldn\'t find user at update account' })
  }
})

router.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id)
  res.status(200).json(deletedUser)
})

module.exports = router