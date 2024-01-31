const { User, Message, Conversation } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-password')
    },
    conversation: async (parent, { id }) => {
      return Conversation.findById(id).populate('messages')
    },
  },
  Mutation: {
    AddUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password })
        if (!user) {
          return console.log('ERROR')
        }
        const token = signToken(user)
        return { token, user }
      } catch (e) {
        console.log(`ERROR: ${e}`)
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          throw AuthenticationError
        }
        const checkPassword = await user.isCorrectPassword(password)
        if (!checkPassword) {
          throw AuthenticationError
        }
        const token = signToken(user)
        return { token, user }
      } catch (e) {
        console.log(`ERROR: ${e}`)
      }
    },
  },
}
module.exports = resolvers
