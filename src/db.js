const bookshelf = require('bookshelf')
const config = require('config')
const knex = require('knex')
const R = require('ramda')

const ENV = R.pathOr('development', ['env', 'NODE_ENV'], process)
const dbName = (tenant) => `enrollment_tenant_${tenant}_${ENV}`

module.exports = R.memoize((tenant) => {
  const database = dbName(tenant)
  const connection = knex({
    client: 'mysql',
    connection: {
      database,
      password: config.db.password,
      user: config.db.username,
      charset: 'utf8',
      host: '127.0.0.1',
    },
  })
  return bookshelf(connection)
})
