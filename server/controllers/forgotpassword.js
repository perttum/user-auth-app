const router          = require('express').Router()
const ResetToken      = require('../models/resetToken')
const User            = require('../models/user')
const crypto          = require('crypto')
const logger          = require('../utils/logger')
const config          = require('../utils/config')
const mailer          = require('../utils/mailer')
const hashPassword    = require('../utils/hashPassword')
const login           = require('../utils/login')

// Post reset password request. Sends password reset mail to user.
router.post('/', async (req, res) => {

  const userEmail = req.body.email
  const user = await User.findOne({ email: userEmail })
  console.log('user at forgot password', user)

  if(user){
    // Create random token for the reset request
    const token = crypto.createHmac('sha256', config.SECRET).digest('hex')

    const newResetToken = {
      user: user._id,
      resetPasswordToken: token,
    }
    const resetToken = new ResetToken(newResetToken)
    const savedToken = await resetToken.save()

    const subject = 'Request for password reset'
    const mailBody = `
                      <h1>Reset your password</h1>
                      <p>
                        This email was sent to you because you requested a password reset.
                        If you did you not make the request, please ignore the email.
                      </p>
                      <p>To reset your password, click the link below</p>
                      <a href="http://localhost:3000/reset?token=${token}">
                        reset password
                      </a>
                      <p>Can't click the link? Copy this address to your browsers address bar:</p>
                      <p>http://localhost:3000/reset?token=${token}</p>
                      `

    const sendMailResponse = await mailer.sendMail(userEmail, subject, mailBody)
    logger.info(`Sent password reset mail to ${userEmail}. Response: ${sendMailResponse}`)

    res.status(200).json(savedToken)
  } else {
    logger.error(`User with an email address: ${userEmail} not found.`)
    res.status(404).json({ error: `User with an email address: ${userEmail} not found.` })
  }
})

// Check that resetToken exists in DB. Token is passed as a query string.
// Route is visited by clicking reset link in email
router.get('/reset', async (req, res) => {

  const token = await ResetToken.findOne({ resetPasswordToken: req.query.token })

  if(token){
    res.status(200).json({ status: 'token found' })
  } else{
    res.status(404).json({ status: 'token expired or missing' })
  }
})

// Post new password
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
    await login(user, newPassword)
    res.status(200).json(user).end()
  } else {
    res.status(404).json({ error: 'Reset password request has expired.' })
  }
})

module.exports = router