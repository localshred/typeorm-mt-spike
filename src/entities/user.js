const RelationTypes = require('typeorm/metadata/types/RelationTypes')

console.log('loading user model')

module.exports = {
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
      nullable: false
    },
    firstName: {
      type: 'string',
      nullable: false
    },
    lastName: {
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
    accounts: {
      target: 'Account',
      type: RelationTypes.ONE_TO_MANY
    }
  }
}




