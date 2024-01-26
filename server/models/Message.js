const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  conversation: {
    type: mongoose.Schema.ObjectId,
    ref: 'Conversation',
  },
  content: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
