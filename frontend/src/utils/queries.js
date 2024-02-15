import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      isOnline
    }
  }
`
export const QUERY_CONVERSATION = gql`
  query conversation($conversationId: ID!) {
    conversation(id: $conversationId) {
      messages {
        id
        content
        sender {
          _id
        }
      }
      users {
        _id
        username
        email
        isOnline
        pfp
      }
    }
  }
`
// Need to add this server side (type Query & resolver)
export const QUERY_SINGLE_USER = gql`
  query getSingleUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      pfp
      isOnline
      friends {
        _id
        username
        email
        pfp
        isOnline
      }
      friendRequests {
        _id
        username
        email
        pfp
        isOnline
      }
    }
  }
`
export const QUERY_SINGLE_USER_CONVERSATIONS = gql`
  query inbox($userId: ID!) {
    userConversation(userId: $userId) {
      id
      otherUser {
        _id
        username
        pfp
        isOnline
      }
      lastMessage
      lastSender
    }
  }
`

// search bar
export const QUERY_SEARCH_USERS = gql`
  query findUser($username: String) {
    findUser(username: $username) {
      _id
      username
      isOnline
      # friends
    }
  }
`

export const FIND_ONE_CONVERSATION = gql`
  query convo($userId: ID!, $friendId: ID!) {
    findConversation(userId: $userId, friendId: $friendId) {
      id
    }
  }
`
