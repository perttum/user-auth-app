const bcrypt      = require('bcrypt')
const jwt         = require('jsonwebtoken')
const config      = require('./config')
const logger      = require('../utils/logger')

const login = async (user, password) => {
  // logger.info('logging in...')

  // Check if user is found and password is correct
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.hash)

  // If there was something wrong with password or user, stop here
  if(!(user && passwordCorrect)){
    logger.error('Login failed. Invalid username or password.')
    return null
  }

  // User for token creation
  const userForToken = {
    username: user.username,
    id: user._id
  }

  // Create token with jsonwebtoken
  const token = jwt.sign(userForToken, config.SECRET)

  const loggedInUser = {
    token,
    username: user.username,
    email: user.email,
    userCreated: user.userCreated,
    id: user._id
  }
  logger.info('Logged in: ', loggedInUser)
  return loggedInUser
}

module.exports = login