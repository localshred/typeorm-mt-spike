const dbConnect = require('../db')
const path = require('path')
const R = require('ramda')

const db = (req, res, next) => {
  const tenant = R.pathOr('default', ['query', 'tenant'], req)
  dbConnect(tenant)
    .then((connection) => {
      res.locals.tenant = tenant
      res.locals.db = connection

      next()
      console.log('-----')
    })
}

module.exports = db
