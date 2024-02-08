import { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button } from '@mui/material'
import { addMessage } from '../utlis/mutation'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { QUERY_CONVERSATION } from '../utlis/queries'
import { messageAdded } from '../utlis/subscriptions'
import auth from '../utlis/auth'
import { Form } from 'react-router-dom'

export default function NavInbox(props) {
  const id = auth.getProfile().data._id
  const [messages, setMessages] = useState([])
  const [sendNewMessage, setSendNewMessage] = useState('');
  const { loading, data } = useQuery(QUERY_CONVERSATION, {
    variables: { conversationId: props.message },
    onCompleted: (data) => {
      if (data && data.conversation) {
        setMessages(data.conversation.messages)
      }
    },
  })
   
  const [sendMessage, { messageData, messageLoading, error }] =
    useMutation(addMessage, {variables: { senderId:id, conversationId:props.message, content:sendNewMessage 
    }})

  const { data: newMessage } = useSubscription(messageAdded, {
    variables: { conversationId: props.message },
  })

  useEffect(() => {
    if (newMessage && newMessage.messageAdded) {
      const message = newMessage.messageAdded
      setMessages((prevMessages) => [...prevMessages, message])
    }
  }, [newMessage]);

  if (loading) {
    return <p>loading</p>
  }
  return (
<Grid container direction="column">
  {messages && messages.map((message) => (
    <Grid
      item
      key={message.id}
      sx={{
        textAlign: 'center', 
        backgroundColor: message.sender._id === id ? '#80ADA0' : '#013440',
        color: message.sender._id === id ? '#fff' : '#fff',
        borderRadius: 10,
        padding: '0.5rem', 
        marginBottom: '0.5rem',
        maxWidth: '70%',
        marginLeft: message.sender._id !== id ? 'auto' : 0,
        marginRight: message.sender._id === id ? 'auto' : 0,
      }}
    >
      <Typography variant="body1">{message.content}</Typography>
    </Grid>
  ))}
        
      
      <Grid item sx={{ position: 'fixed', bottom: 57, left: 0, right: 0 }}>
      <Form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            sendMessage(); // Call the sendMessage function to send the new message
          }}
        >
          <TextField
            onChange={(e) => setSendNewMessage(e.target.value)}
            fullWidth
            id="fullWidth"
          />
          <Button type="submit" variant="contained">Send Message</Button>
        </Form>
    </Grid>
</Grid>
  )
}