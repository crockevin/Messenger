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
          throw new Error('ERROR')
        }
        const token = signToken(user)
        return { token, user }
      } catch (e) {
        throw new Error(e)
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
        throw new Error(e)
      }
    },
    addMessage: async (
      parent,
      { senderId, conversationId, content },
      context
    ) => {
      try {
        // if (!context.user) {
        //   throw new Error('you are not logged in')
        // }
        // if (context.user._id !== senderId) {
        //   throw new Error('You are not this user')
        // }
        const conversation = await Conversation.findById(conversationId)
        if (!conversation) {
          throw new Error('Invalid Conversation')
        }
        const inConversation = conversation.users.includes(senderId)
        if (!inConversation) {
          throw new Error('You are not in this conversation')
        }
        const message = await Message.create({
          sender: senderId,
          conversation: conversationId,
          content,
        })
        if (!message) {
          throw new Error('Message could not be created')
        }
        conversation.messages.push(message._id)
        await conversation.save()
        await message.populate('sender')
        return message
      } catch (e) {
        throw new Error(e)
      }
    },
  },
}
module.exports = resolvers
