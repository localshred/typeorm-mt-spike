module.exports = (bookshelf) => bookshelf.model('User', {
  tableName: 'users',

  hasTimestamps: true,

  accounts: function accounts() {
    return this.hasMany('Account', 'userId')
  },

  initialize: function initialize() {
    this.on('created', (model, attributes, options) => {
      console.log(`Created user`)
      console.log({ attributes, options })
    })

    this.on('updated', (model, attributes, options) => {
      console.log(`Updated user`)
      console.log({ attributes, options })
    })

    this.on('destroyed', (model, attributes, options) => {
      console.log(`Destroyed user`)
      console.log({ attributes, options })
    })
  },
})
