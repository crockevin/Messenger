import React from 'react'
import { TextField, Box, Typography, Grid, Button } from '@mui/material'
import SnackbarContent from '@mui/material/SnackbarContent';

// userid: 65b6b87f1a77190affd0dfd9

 
export default function NavInbox() {
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
  const { loading, data } = useQuery(QUERY_CONVERSATION, {
    variables: { conversationId: '65b6b87f1a77190affd0dfef' },
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
  }, [newMessage]);
  const handleToggleNewMessage = () => {
    setShowNewMessage((prev) => !prev);
  };

  const handleSend = (content) => {
    sendMessage({
      variables: {
        senderId: '65b6b87f1a77190affd0dfd9',
        conversationId,
        content,
      },
    });
  };

  if (loading) {
    return <p>loading</p>
  }
  return (
    <Container>
      <Box mt={2}>
        <Button onClick={handleToggleNewMessage} variant="contained" color="primary">
          New Message
        </Button>
        {showNewMessage && <NewMessage onSend={handleSend} />}
      </Box>
      <Box mt={2}>
        <Typography variant="h5" component="div">
          Messages
        </Typography>
        {messages &&
          messages.map((message) => (
            <Typography key={message.id} component="div">
              {message.content} {message.sender._id}
            </Typography>
          ))}
      </Box>
    </Container>
  );

//export default function SingleChat({ message }) {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5">{message.user.username}</Typography>
      </Grid>
      <Grid item>
        <Typography>{message.content}</Typography>
      </Grid>
      <Grid container direction="row">
        <Grid item sx={{ position: 'fixed', bottom: 57, left: 0, right: 0 }}>
          <TextField
            fullWidth
            id="fullWidth"
            InputProps={{
              endAdornment: <Button variant="contained">Send</Button>,
            }}
          />
        </Grid>
      </Grid>
      {/* Add more details or rendering logic as needed */}
    </Grid>
  )
}

// sx={{ position: 'fixed', bottom: 60, left: 0, right: 0 }}>
