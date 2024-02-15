import { useState, useEffect, useRef } from 'react'
import { TextField, Typography, Grid, Button } from '@mui/material'
import { addMessage } from '../utils/mutation'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { QUERY_CONVERSATION } from '../utils/queries'
import { messageAdded } from '../utils/subscriptions'
import auth from '../utils/auth'
import { Form } from 'react-router-dom'
import { InputAdornment } from '@mui/material'

export default function NavInbox(props) {
  const id = auth.getProfile().data._id
  const [messages, setMessages] = useState([])
  const [sendNewMessage, setSendNewMessage] = useState('')
  const { loading, data } = useQuery(QUERY_CONVERSATION, {
    variables: { conversationId: props.message },
    onCompleted: (data) => {
      if (data && data.conversation) {
        setMessages(data.conversation.messages)
      }
    },
  })

  // refetchQuery added to ensure new data conversation data is Queried + updated to page
  const [sendMessage, { messageData, messageLoading, error }] = useMutation(
    addMessage,
    {
      refetchQueries: [
        {
          query: QUERY_CONVERSATION,
          variables: { conversationId: props.message },
        },
      ],
      variables: {
        senderId: id,
        conversationId: props.message,
        content: sendNewMessage,
      },
    }
  )

  const { data: newMessage } = useSubscription(messageAdded, {
    variables: { conversationId: props.message },
  })

  useEffect(() => {
    if (newMessage && newMessage.messageAdded) {
      const message = newMessage.messageAdded
      setMessages((prevMessages) => [...prevMessages, message])
    }
  }, [newMessage])

  // Reference for scrolling to bottom of chat container
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    sendMessage();
    setSendNewMessage('');
  };

  if (loading) {
    return <p>loading</p>
  }
  return (
    <Grid
      container
      direction="column"
    >
      {messages &&
        messages.map((message) => (
          <Grid
            item
            key={message.id}
            sx={{
              textAlign: 'center',
              backgroundColor:
                message.sender._id === id ? '#013440' : '#80ADA0',
              color: '#fff',
              borderRadius: 16,
              padding: '0.5rem',
              marginBottom: '0.5rem',
              maxWidth: '70%',
              marginLeft: message.sender._id === id ? 'auto' : 2,
              marginRight: message.sender._id !== id ? 'auto' : 2,
              marginTop: 1,
            }}
          >
            <Typography variant="body1">{message.content}</Typography>
          </Grid>
        ))}
      <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
      <Grid item sx={{ position: 'fixed', bottom: 57, left: 0, right: 0 }}>
        <Form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            handleSendMessage(); // Call the sendMessage function to send the new message
          }}
        >
          <TextField
            value={sendNewMessage}
            onChange={(e) => setSendNewMessage(e.target.value)}
            fullWidth
            id="fullWidth"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button type="submit" variant="contained">
                    Send Message
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Form>
      </Grid>
    </Grid>
  )
}
