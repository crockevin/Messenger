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
  mutation {
    DeleteUser
  }
`;