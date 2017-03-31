const RelationTypes = require('typeorm/metadata/types/RelationTypes')
console.log('loading accounts model')

module.exports = {
  name: 'Account',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
      nullable: false
    },
    label: {
      type: 'string',
      nullable: false
    },
    accountType: {
      type: 'string',
      nullable: false
    },
    createdAt: {
      type: 'datetime',
      nullable: false
    },
    updatedAt: {
      type: 'datetime',
      nullable: false
    }
  },
  relations: {
    user: {
      target: 'User',
      type: RelationTypes.MANY_TO_ONE,
      cascadeRemove: true
    }
  }
}
