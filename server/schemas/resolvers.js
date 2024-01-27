const { User, Message, Conversation } = require('../')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-password')
    },
  },
}
module.exports = resolvers
