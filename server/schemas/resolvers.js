const { User, Message, Conversation } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { PubSub } = require('graphql-subscriptions')
const pubSub = new PubSub()

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-password')
    },
    user: async (parent, { id }) => {
      return User.findById(id).populate('friends').populate('friendRequests')
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
        user.isOnline = true
        await user.save()
        return { token, user }
      } catch (e) {
        throw new Error(e)
      }
    },
    addMessage: async (parent, { senderId, conversationId, content }, context) => {
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
        const channel = `MESSAGE_ADDED${conversationId}`
        pubSub.publish(channel, { messageAdded: message })
        return message
      } catch (e) {
        throw new Error(e)
      }
    },
  },
  Subscription: {
    messageAdded: {
      async subscribe(parent, { conversationId }) {
        const channel = `MESSAGE_ADDED${conversationId}`
        console.log(`Subscription initiated for channel: ${channel}`)
        return pubSub.asyncIterator(channel)
      },
    },
  },
}
module.exports = resolvers
