import { gql } from '@apollo/client'

export const messageAdded = gql`
  subscription newMessage($conversationId: ID!) {
    messageAdded(conversationId: $conversationId) {
      id
      sender {
        _id
        username
      }
      content
      timeStamp
    }
  }
`
