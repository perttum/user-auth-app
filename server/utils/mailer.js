const nodemailer = require('nodemailer')
const config = require('./config')
const logger = require('./logger')

const transporter = nodemailer.createTransport({
  // service: 'gmail',
  // host: 'ccln100.capnova.com',
  host: 'mail.ahjomedia.fi',
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASS
  }
})

const sendMail = async (to, subject, content) => {

  const options = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: content,
    html: content
  }

  const response = await transporter.sendMail(options)
  logger.info('response from sending mail: ', response)
  return response
}

module.exports = { sendMail }
