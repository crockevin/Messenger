const mongoose = require('mongoose')

const converstationSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Message',
    },
  ],
  lastMessage: {
    type: String,
  },
  lastSender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})
const Conversation = mongoose.model('Conversation', converstationSchema)

module.exports = Conversation
