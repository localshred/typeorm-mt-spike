const typeorm = require('typeorm')
const config = require('config')
const path = require('path')
const R = require('ramda')

const ENV = R.pathOr('development', ['env', 'NODE_ENV'], process)
const dbName = (tenant) => `enrollment_tenant_${tenant}_${ENV}`

const rootPath = path.join(__dirname, '..')
const srcPath = path.join(rootPath, 'src')

const connectionOptions = {
  autoSchemaSync: false,
  driver: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 5432,
    username: config.db.username,
    password: config.db.password,
  },
  entities: [ path.join(srcPath, 'entities', '*.js') ],
  logger: {
    logFailedQueryError: true,
    logQueries: true,
    logSchemaCreation: true,
  },
  migrations: [ path.join(rootPath, 'migrations', '*.js') ],
  subscribers: [ path.join(srcPath, 'subscribers', '*.js') ],
}

const mergeConnectionOptions = R.curry(
  (original, next) => R.pipe(
    R.assocPath(['driver', 'database'], R.path(['driver', 'database'], next)),
    R.assocPath(['name'], R.path(['name'], next))
  )(original)
)

const getTenantConnectionOptionsOverrides = R.pipe(
  R.toLower,
  R.applySpec({
    driver: { database: dbName },
    name: R.identity
  })
)

const getConnectionForTenant = R.memoize(
  R.pipe(
    getTenantConnectionOptionsOverrides,
    mergeConnectionOptions(connectionOptions),
    R.bind(typeorm.createConnection, typeorm)
  )
)

module.exports = getConnectionForTenant
