const router          = require('express').Router()
const logger          = require('../utils/logger')
const ExampleModel    = require('../models/exampleModel')

// Get all example shouts
router.get('/', async (req, res) => {
  const examples = await ExampleModel.find({})
  logger.info('Found examples: ', examples)
  res.status(200).json(examples)
})

// Create new example shout
router.post('/', async (req, res) => {

  // New document to be inserted into db
  const document = {
    ...req.body,
    createdAt: new Date()
  }

  // Create and save (insert) the document
  const newExampleDocument = new ExampleModel(document)
  await newExampleDocument.save()

  logger.info('Created a new document: ', newExampleDocument)

  res.status(200).json(newExampleDocument)
})

module.exports = router