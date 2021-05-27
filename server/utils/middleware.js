const logger        = require('./logger')
const jwt           = require('jsonwebtoken')

const verifyToken = async (token) => {

  try{
    jwt.verify(token, process.env.SECRET)
    return true

  } catch(err){
    logger.error('couldn\'t verify token')
    return false
  }
}

const getToken = async (req, res, next) => {

  const auth = req.get('authorization')
  let verified = false

  if(auth && auth.toLowerCase().startsWith('bearer ')){

    const token = auth.substring(7)
    verified = await verifyToken(token)

  }
  if(verified){

    req.token = auth.substring(7)
    next()

  } else{
    res.status(401).json({ error: 'token validation failed' })
  }
}

const unknowEndPoint = (req, res) => {
  logger.error({ error: 'unkown endpoint' })
  res.status(404).json({ error: 'unkown endpoint' }).end()
}

const errorHandler = (error, request, response, next) => {
  logger.error('Uh.. Made an error... ' + error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  next(error)
}

module.exports = { unknowEndPoint, errorHandler, getToken }