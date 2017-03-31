const TABLE_NAME = 'accounts'
const ACCOUNT_TYPES = ['checking', 'savings']

throw new Exception('not implemented')

exports.up = function(knex, Promise) {
  return knex.schema.alterTable(TABLE_NAME, function (t) {
    t.dropColumn('accounType')
    t.string('label').notNullable().alter()
    t.enum('accountType', ACCOUNT_TYPES).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable(TABLE_NAME, function (t) {
    t.string('label').alter()
    t.enum('accounType', ACCOUNT_TYPES).alter()
    t.dropColumn('accountType')
  })
};
