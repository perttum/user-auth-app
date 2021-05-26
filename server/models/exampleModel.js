const mongoose = require('mongoose')

// Simple Mongo model that stores a shout message and a date it was created

const exampleSchema = new mongoose.Schema({
  shout: {
    required: true,
    type: String
  },
  createdAt: {
    required: true,
    type: Date
  }
})

exampleSchema.set('toJSON', {
  transform: (doc, returnedDoc) => {
    returnedDoc.id = doc._id
    delete returnedDoc._id
    delete returnedDoc.__v
  }
})

module.exports = mongoose.model('ExampleModel', exampleSchema)