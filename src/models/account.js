const Joi = require('joi')

module.exports = (bookshelf) => bookshelf.model('Account', {
  tableName: 'accounts',

  hasTimestamps: true,

  validate: {
    userId: Joi.number().integer().positive().required(),
    label: Joi.string().required().regex(/[^\s]+/),
    accountType: Joi.string().valid(['checking', 'savings']).required(),
  },

  user: function user() {
    this.belongsTo('User')
  },

  initialize: function initialize() {
    this.on('created', (model, attributes, options) => {
      console.log(`Created account ${options.query.toString()}`)
      console.log({ model, attributes, options })
    })

    this.on('updated', (model, updatedCount, options) => {
      console.log(`Updated account ${options.query.toString()}`)
      console.log({ model, changes: model.changes, updatedCount, options })
    })

    this.on('destroyed', (model, deletedCount, options) => {
      console.log(`Destroyed account ${options.query.toString()}`)
      console.log({ model, deletedCount, options })
    })

    this.on('destroying', (model, options) => {
      console.log(`Destroying account ${options.query.toString()}`)
      console.log({ model, options })
    })
  },
})
