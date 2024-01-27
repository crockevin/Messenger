const db = require('../config/connection')
const { User, Message, Conversation } = require('../models')
const userSeeds = require('./userSeeds.json')
const cleanDB = require('./cleanDB')

db.once('open', async () => {
  try {
    await cleanDB('User', 'users')
    await cleanDB('Message', 'messages')
    await cleanDB('Conversation', 'conversations')
    const users = await User.create(userSeeds)

    const conversation1 = await Conversation.create({
      users: [users[0], users[1]],
    })
    const conversation2 = await Conversation.create({
      users: [users[2], users[3]],
    })
    const conversation3 = await Conversation.create({
      users: [users[4], users[5]],
    })

    const message1 = await Message.create({
      sender: users[0],
      conversation: conversation1,
      content: 'Whats up man',
    })
    conversation1.messages.push(message1._id)
    await conversation1.save()
    const message2 = await Message.create({
      sender: users[1],
      conversation: conversation1,
      content: 'Big Dog!',
    })
    conversation1.messages.push(message2._id)
    await conversation1.save()
    const message3 = await Message.create({
      sender: users[2],
      conversation: conversation2,
      content: 'Whats up lil guy',
    })
    conversation2.messages.push(message3._id)
    await conversation2.save()
    const message4 = await Message.create({
      sender: users[3],
      conversation: conversation2,
      content: 'Whats up old man',
    })
    conversation2.messages.push(message4._id)
    await conversation2.save()
    const message5 = await Message.create({
      sender: users[4],
      conversation: conversation3,
      content: 'i hate it here',
    })
    conversation3.messages.push(message5._id)
    await conversation3.save()
    const message6 = await Message.create({
      sender: users[5],
      conversation: conversation3,
      content: 'me too',
    })
    conversation3.messages.push(message6._id)
    await conversation3.save()

    users[0].friends.push(users[1])
    users[1].friends.push(users[0])
    users[2].friends.push(users[3])
    users[3].friends.push(users[2])
    users[4].friends.push(users[5])
    users[5].friends.push(users[4])

    await Promise.all(users.map((user) => user.save()))
    const conversations = await Conversation.find().populate('messages')
    console.log(conversations)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('all done!')
  process.exit(0)
})
