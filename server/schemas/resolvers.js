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
      console.log('User ID:', id)
      const user = await User.findById(id).select('-password')
      await user.populate({
        path: 'friends',
        select: '-password',
      })
      await user.populate({
        path: 'friendRequests',
        select: '-password',
      })

      console.log('User Data:', user)
      return user
    },
    conversation: async (parent, { id }) => {
      return Conversation.findById(id).populate('messages').populate('users')
    },
    userConversation: async (parent, { userId }) => {
      try {
        const conversations = await Conversation.find({ users: userId })
        const conversationsWithUsers = conversations.map(async (conversation) => {
          const otherUserId = conversation.users.find((user) => user !== userId)
          const otherUser = await User.findById(otherUserId)
          return {
            id: conversation._id,
            otherUser: otherUser,
          }
        })
        return conversationsWithUsers
      } catch (error) {
        throw new Error('Error retrieving user conversations')
      }
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
    addfriend: async (parent, { userId, friendId }) => {
      const user = await User.findById(userId)
      const friend = await User.findById(friendId)
      if (!user || !friend) {
        throw new Error('User or friend not found')
      }
      user.friends.push(friend)
      await user.save()
      friend.friends.push(user)
      await friend.save()

      const conversation = new Conversation({
        users: [user, friend],
      })
      await conversation.save()
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
