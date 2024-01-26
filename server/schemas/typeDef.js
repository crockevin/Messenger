const typeDefs = `

tyoe User {
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

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
}


`