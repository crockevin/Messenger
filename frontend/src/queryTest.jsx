import { useEffect, useState } from 'react'
import { QUERY_CONVERSATION } from './utlis/queries'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'



function Conversation() {
  const { conversationId } = useParams()
  const { loading, data } = useQuery(QUERY_CONVERSATION, {
    variables: { conversationId: conversationId }
  })

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>
      {data && data.conversation.messages.map((message) => (
        <div key={message.id}>{message.content}  {message.sender._id}</div>
      ))}
    </>
  );
}

export default Conversation
