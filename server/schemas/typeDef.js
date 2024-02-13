const typeDefs = `

scalar Date
scalar Upload
type User {
    _id: ID
    username: String
    email: String
    friends: [User]
    friendRequests: [User]
    pfp: String
    isOnline: Boolean
}

type Message {
    id: ID
    sender: User
    conversation: Conversation
    content: String
    timeStamp: Date
}

type Conversation {
    id: ID
    users: [User]
    messages: [Message]
    lastMessage: String
    lastSender: ID
}

type Auth {
    token: ID!
    user: User
}
type UserConversation {
    id: ID
    otherUser: User
    lastMessage: String
    lastSender: ID
}
type File {
    filename: String!
    mimetype: String!
    encoding: String!
    path: String!
}

type Query {
    findUser(username: String): [User]
    users: [User]
    user(id: ID!): User
    conversation(id: ID!): Conversation
    userConversation(userId:ID!): [UserConversation]
    
}

type Subscription {
    messageAdded(conversationId: ID!): Message
}

type Mutation {
    AddUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMessage(senderId: ID!, conversationId: ID!, content: String!): Message
    addfriend(userId: ID!, friendId: ID!): String
    addfriendRequest(userId: ID!, friendId: ID!): String
    deleteUser(userId: ID!): String
    deleteConversation(conversationId: ID!, userId: ID!, otherUserId: ID!): String
    updateOnlineStatus(userId: ID!, isOnline: Boolean!): String
    singleUpload(userId: ID!, file: Upload!): File
}


`
module.exports = typeDefs
