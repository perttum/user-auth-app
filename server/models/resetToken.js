const mongoose            = require('mongoose')
const uniqueValidator     = require('mongoose-unique-validator')

const resetTokenSchema = mongoose.Schema({
  index: {
    createdAt: {
      type: Date,
      index: { expireAfterSeconds: 1800 }, // 30 min expiry time
      default: Date.now
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resetPasswordToken: String
}, { timestamps: true })

resetTokenSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
  }
})

resetTokenSchema.plugin(uniqueValidator)

module.exports = mongoose.model('ResetToken', resetTokenSchema)