const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  friendsRequests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  pfp: {
    type: String,
    default: 'placefolder img path',
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
