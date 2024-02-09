import { useEffect, useState } from 'react'
import { QUERY_CONVERSATION } from '../utils/queries'
import { messageAdded } from '../utils/subscriptions'
import { addMessage } from '../utils/mutation'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'



function Conversation() {
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
  const { loading, data } = useQuery(QUERY_CONVERSATION, {
    variables: { conversationId: conversationId },
    onCompleted: (data) => {
      if (data && data.conversation) {
        setMessages(data.conversation.messages)
      }
    },
  })

  const { data: newMessage } = useSubscription(messageAdded, {
    variables: { conversationId: conversationId },
  })

  useEffect(() => {
    if (newMessage && newMessage.messageAdded) {
      const message = newMessage.messageAdded
      setMessages((prevMessages) => [...prevMessages, message])
    }
  }, [newMessage])
  if (loading) {
    return <p>loading</p>
  }
  return (
    <>
      {messages.length}
      {messages &&
        messages.map((message) => (
          <div key={message.id}>
            {message.content} {message.sender._id}
          </div>
        ))}
    </>
  )
}

export default Conversation
