const mongoose = require('mongoose')

const converstaionSchema = new mongoose.Schema({
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
})
const Conversation = mongoose.model('Conversation', converstaionSchema)

module.exports = Conversation
