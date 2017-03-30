const TABLE_NAME = 'accounts'

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (t) {
    t.increments().primary()
    t.integer('userId').notNullable().index()
    t.string('label')
    t.enum('accounType', ['checking', 'savings'])
    t.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
};
