const { User, Message, Conversation } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth')
const { PubSub } = require('graphql-subscriptions')
const pubSub = new PubSub()
const fs = require('fs')
const resolvers = {
  Query: {
    users: async () => {
      return User.find()
    },
    user: async (parent, { id }) => {
      console.log('User ID:', id)
      const user = await User.findById(id)
      console.log('User Data:', user)
      return user
    },
    findUser: async (parent, { username }) => {
      return await User.find({ username: { $regex: username, $options: 'i' } })
    },
    conversation: async (parent, { id }) => {
      return Conversation.findById(id).populate('messages').populate('users')
    },
    userConversation: async (parent, { userId }) => {
      try {
        const conversations = await Conversation.find({ users: userId })
        const conversationsWithUsers = conversations.map(async (conversation) => {
          const otherUserId = conversation.users.find((user) => user.toString() !== userId)
          const otherUser = await User.findById(otherUserId)
          return {
            id: conversation._id,
            otherUser: otherUser,
            lastMessage: conversation.lastMessage,
            lastSender: conversation.lastSender,
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
        user.isOnline = true
        await user.save()
        return { token, user }
      } catch (e) {
        throw new Error(e)
      }
    },
    deleteUser: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId)
        const name = user.username
        await User.updateMany({ friendRequests: userId }, { $pull: { friendRequests: userId } })
        const conversations = await Conversation.find({
          users: userId,
        })
        for (const conversation of conversations) {
          await Message.deleteMany({ conversation: conversation._id })
          await conversation.deleteOne()
        }
        await user.deleteOne()
        return `${name} got Hollow Purpled`
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
    addfriendRequest: async (parent, { userId, friendId }) => {
      const user = await User.findById(userId)
      const friend = await User.findById(friendId)
      if (!user || !friend) {
        throw new Error('User or friend not found')
      }
      friend.friendRequests.push(user)
      await friend.save()
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
    deleteConversation: async (parent, { conversationId, userId, otherUserId }, context) => {
      try {
        const conversation = await Conversation.findById(conversationId)

        if (!conversation) {
          throw new Error('Conversation not found')
        }
        const user = await User.findById(userId)
        if (!user) {
          throw new Error('User not found')
        }
        const otherUser = await User.findById(otherUserId)
        if (!otherUser) {
          throw new Error('Other user not found')
        }
        await Message.deleteMany({ conversation: conversation._id })
        await conversation.deleteOne()
        const newConversation = new Conversation({ users: [user, otherUser] })
        await newConversation.save()
      } catch (error) {
        console.log(error)
      }
    },
    updateOnlineStatus: async (parent, { userId, isOnline }) => {
      try {
        console.log('test')
        const user = await User.findById(userId)
        if (!user) {
          throw new Error('User not found')
        }
        user.isOnline = isOnline
        await user.save()
        return `${user.username} status updated`
      } catch (error) {
        console.error('Resolver error:', error)
        throw new Error('Failed to update user status')
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
