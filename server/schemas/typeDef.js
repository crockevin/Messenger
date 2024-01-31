const typeDefs = `

scalar Date

type User {
    _id: ID
    username: String
    email: String
    password: String
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
}

type Auth {
    token: ID!
    user: User
}

type Query {
    users: [User]
    conversation(id: ID!): Conversation
}

type Mutation {
    AddUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
}


`
module.exports = typeDefs
