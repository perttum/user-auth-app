const logger = require('../utils/logger')

test('logger is logging along ok', () => {
  console.log = jest.fn()

  // Info
  logger.info('Hello')
  expect(console.log.mock.calls[0][0]).toBe('Hello')

  // Error
  logger.info('Error!', { name: 'bad call', id: 'HGS' })
  expect(console.log.mock.calls[1][0]).toBe('Error!')
})