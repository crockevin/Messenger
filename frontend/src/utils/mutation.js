import { gql } from '@apollo/client'

export const signup = gql`
  mutation signin($username: String!, $email: String!, $password: String!) {
    AddUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`
export const login = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

export const addMessage = gql`
  mutation addMessage($senderId: ID!, $conversationId: ID!, $content: String!) {
    addMessage(
      senderId: $senderId
      conversationId: $conversationId
      content: $content
    ) {
      id
      sender {
        _id
      }
      content
      timeStamp
    }
  }
`
export const DeleteUser = gql`
  mutation delete($userId: ID!) {
    deleteUser(userId: $userId)
  }
`

export const onlineStatus = gql`
  mutation UpdateOnlineStatus($userId: ID!, $isOnline: Boolean!) {
    updateOnlineStatus(userId: $userId, isOnline: $isOnline)
  }
`

// DELETE CONVO 
export const delete_Conversation = gql `
mutation deleteConversation($conversationId: ID!, $userId: ID!, $otherUserId: ID!) {
  deleteConversation(conversationId: $conversationId, userId: $userId, otherUserId: $otherUserId )
}`

export const addFriend = gql`
  mutation addFriend($userId: ID!, $friendId: ID!) {
    addfriend(
      userId: $userId
      friendId: $friendId
    )
  }
`
