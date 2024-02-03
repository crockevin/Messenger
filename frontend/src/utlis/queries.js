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
    }
  }
`
// Need to add this server side (type Query & resolver)
export const QUERY_SINGLE_USER = gql `
query getSingleUser($_id: ID! ) {
  user (_id: $_id) {
    _id
    username
    email
    password
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
