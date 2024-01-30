const { User, Message, Conversation } = require('../models')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-password')
    },
    conversation: async (parent, { id }) => {
      return Conversation.findById(id).populate("messages")
    },
  },
}
module.exports = resolvers
