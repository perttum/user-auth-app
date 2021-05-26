const router          = require('express').Router()
const bcrypt          = require('bcrypt')
const jwt             = require('jsonwebtoken')
const User            = require('../models/user')
const hashPassword    = require('../utils/hashPassword')
const ResetToken      = require('../models/resetToken')
const crypto          = require('crypto')
const logger          = require('../utils/logger')
const mailer          = require('../utils/mailer')
const config          = require('../utils/config')
const login           = require('../utils/login')

// Login user
router.post('/', async (req, res) => {

  // find the user from DB
  const user = await User.findOne({ username: req.body.username })

  // If User was found and password was submitted
  let loggedInUser
  if(user && req.body.password){

    // Check if user license has expired
    const expiryDate = user.expiryDate
    if(expiryDate && expiryDate < new Date()){
      logger.error('User expired!')
      res.status(401).json({ error: 'Käyttäjälisenssi vanhentunut.' })
    }
    else if(!user.active){
      res.status(401).json({ error: 'Käyttäjätili ei ole aktiivinen.' })
    }
    else{
      loggedInUser = await login(user, req.body.password)
      if(loggedInUser){
        res.status(200).json(loggedInUser)
      }
      else {
        logger.error('invalid username or password')
        res.status(401).json({ error: 'Väärä käyttäjänimi tai salasana.' })
      }
    }
  } else {
    logger.error('user not found')
    res.status(401).json({ error: 'Käyttäjänimeä ei löytynyt.' })
  }
})

// Forgot password. Sends password reset mail to user.
router.post('/forgot', async (req, res) => {

  const userEmail = req.body.email
  const user = await User.findOne({ email: userEmail })

  if(user){
    // Create random token for reset request
    const token = crypto.createHmac('sha256', config.SECRET).digest('hex')

    const newResetToken = {
      user: user._id,
      resetPasswordToken: token,
      // resetPasswordTokenExpires: Date(Date().now + 5000)
    }
    const resetToken = new ResetToken(newResetToken)
    const savedToken = await resetToken.save()

    const subject = 'Salasanan vaihtopyyntö - Hierojakoulu App'
    const mailBody = `
                      <h1>Sähköpostiisi on pyydetty salasanan nollauslinkki</h1>
                      <p>Mikäli et ole itse pyytänyt salasanan nollausta, poista tämä viesti.</p>
                      <p>Klikkaamalla alla olevaa linkkiä pääset syöttämään uuden salasanan:</p>
                      <a href="https://hierojakoulu.herokuapp.com/reset?token=${token}">
                        Vaihda salasanasi tästä linkistä.
                      </a>
                      <p>terkuin,</p>
                      <p>Hierojakoulu Robo (älä vastaa minulle :)</p>
                      `

    const sendMailResponse = await mailer.sendMail(userEmail, subject, mailBody)
    logger.info(`Sent password reset mail to ${userEmail}. Response: ${sendMailResponse}`)

    res.status(200).json(savedToken)
  } else {
    logger.error(`User with an email address: ${userEmail} not found.`)
    res.status(404).json({ error: `User with an email address: ${userEmail} not found.` })
  }
})

router.get('/reset', async (req, res) => {

  const q = req.query
  const token = await ResetToken.findOne({ resetPasswordToken: q.token })

  if(token){
    res.status(200).json({ status: 'token found' })
  } else{
    res.status(404).json({ status: 'token expired' })
  }
})

router.post('/reset/:token', async (req, res) => {

  const token = req.params.token
  const newPassword = req.body.password
  const resetToken = await ResetToken.findOne({ resetPasswordToken: token })

  if(resetToken){

    const user = await User.findById(resetToken.user)

    if(newPassword && user){
      const hash = await hashPassword(newPassword)
      user.hash = hash
      await ResetToken.findByIdAndDelete(resetToken.id)
      await user.save()
    }
    await loginUser(user, newPassword)
    res.status(200).json(user).end()
  } else {
    res.status(404).json({ error: 'Salasanan vaihtopyyntö vanhentunut.' }).end()
  }
})

const loginUser = async (user, password) => {
  // console.log('logging in...')

  // Check if user is found and password is correct
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.hash)

  // If there was something wrong with password or user, stop here
  if(!(user && passwordCorrect)){
    return { error: 'invalid username or password' }
  }

  // User for token creation
  const userForToken = {
    username: user.username,
    id: user._id
  }

  // Create token with jsonwebtoken
  const token = jwt.sign(userForToken, process.env.SECRET)

  const loggedInUser = {
    token,
    username: user.username,
    firstname: user.firstname,
    lastname: user.lastname,
    id: user.id,
    role: user.role,
    email: user.email
  }
  return loggedInUser
}

module.exports = router