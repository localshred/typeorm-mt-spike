const TABLE_NAME = 'users'

throw new Exception('not implemented')

exports.up = function(knex, Promise) {
  return knex.schema.createTable(TABLE_NAME, function (t) {
    t.increments().primary()
    t.string('firstName')
    t.string('lastName')
    t.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable(TABLE_NAME)
};
