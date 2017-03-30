const dbConnect = require('../db')
const path = require('path')
const R = require('ramda')

const modelNames = [
  'account',
  'user',
]

const loadTenantModels = R.memoize((tenant) => {
  const connection = dbConnect(tenant)
  connection.plugin('registry')
  connection.plugin(require('bookshelf-modelbase').pluggable)

  const models = R.reduce((accumulator, modelName) => {
    const modelPath = path.join(__dirname, '../models', modelName)
    accumulator[modelName] = require(modelPath)(connection)
    return accumulator
  }, {}, modelNames)

  return [connection, models]
})

const db = (req, res, next) => {
  const tenant = R.pathOr('default', ['query', 'tenant'], req)
  const [bookshelf, models] = loadTenantModels(tenant)

  res.locals.tenant = tenant
  res.locals.db = bookshelf
  res.locals.models = models

  next()
  console.log('-----')
}

module.exports = db
