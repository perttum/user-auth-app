const mongoose            = require('mongoose')
const uniqueValidator     = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: false
  },
  hash: String,
  userCreated: Date,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id
    delete returnedObject.hash
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)