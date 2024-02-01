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
