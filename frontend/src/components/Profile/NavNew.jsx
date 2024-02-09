import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_SINGLE_USER_CONVERSATIONS, addMessage } from '../utils/queries'

export default function NavNew() {
  const { id } = useParams()
  const [recipientId, setRecipientId] = useState('')
  const [message, setMessage] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const history = useHistory()

  const { loading, data } = useQuery(QUERY_SINGLE_USER_CONVERSATIONS, {
    variables: { userId: recipientId },
    onError: (error) => {
      setAlertMessage('User not found')
    },
  })

  const [sendMessage] = useMutation(addMessage, {
    onCompleted: (data) => {
      console.log('Message sent successfully', data)

      history.push(`/singlechat/${data.addMessage.conversationId}`)
    },
    onError: (error) => {
      console.error('Error sending message', error)
    },
  })

  const handleSendMessage = () => {
    if (!message.trim()) {
      setAlertMessage('Please enter a message')
      return
    }

    sendMessage({
      variables: {
        senderId: id,
        conversationId: data.userConversation.id,
        content: message,
      },
    })
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '20px' }}>
        New Message
      </Typography>
      <TextField
        label="Recipient"
        fullWidth
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        sx={{ marginBottom: '20px' }}
      />
      <TextField
        label="Message"
        multiline
        rows={4}
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{ marginBottom: '20px' }}
      />
      <Button variant="contained" onClick={handleSendMessage}>
        Send
      </Button>
      {alertMessage && <Typography color="error">{alertMessage}</Typography>}
    </Box>
  )
}
     // OLD CODE !!
// import React, { useState } from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import { useParams } from 'react-router-dom';

// export default function NavNew() {
//     const { id } = useParams();
//     const [message, setMessage] = useState('');

//     const sendMessage = () => {
//
//         console.log("Message sent:", message);
//     };

//     return (
//         <Box
//             sx={{
//                 position: 'fixed',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 width: '300px',
//                 backgroundColor: '#fff',
//                 boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
//                 borderRadius: '8px',
//                 padding: '20px',
//             }}
//         >
//             <Typography variant="h5" sx={{ marginBottom: '20px' }}>New Message</Typography>
//             <TextField
//                 label="Recipient"
//                 fullWidth
//                 sx={{ marginBottom: '20px' }}
//             />
//             <TextField
//                 label="Message"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 sx={{ marginBottom: '20px' }}
//             />
//             <Button variant="contained" onClick={sendMessage}>Send</Button>
//         </Box>
//     );
// }
