import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState, useRef } from 'react'
import { QUERY_CONVERSATION } from '../../utlis/queries'
import { messageAdded } from '../../utlis/subscriptions'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import SingleChat from '../SingleChat'

export default function NavInbox() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const ref = useRef(null)
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])
  const { loading, data } = useQuery(QUERY_CONVERSATION, {
    variables: { conversationId: '65b6b87f1a77190affd0dfef' },
    onCompleted: (data) => {
      if (data && data.conversation) {
        console.log(data)
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

  const handleClick = (message) => {
    setSelectedMessage(message);
  };

  if (loading) {
    return <p>loading...</p>
  }

  // Render a new component when a message is selected
  if (selectedMessage) {
    return <SingleChat message={selectedMessage} />;
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messages &&
          messages.map(({ content, sender }, index) => {
            // Find the corresponding user from the users array
            const user = data.conversation.users.find((u) => u._id === sender._id);
            return (
              <ListItemButton key={index + sender._id} onClick={() => handleClick({ content, sender, user })}>
                <ListItemAvatar>
                  <Avatar alt={user.username} src={user.pfp} />
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={content} />
              </ListItemButton>
            );
          })}
      </List>
    </Box>
  )
}



// const testMessages = [
//   {
//     username: "Kevin", // USERNAME
//     message: 'I love otters.', // CONTENT
//     pfp: '/static/images/avatar/4.jpg', // PFP
//   },
//   {
//     username: 'Nic',
//     message: `My back hurts.`,
//     pfp: '/static/images/avatar/5.jpg',
//   },
//   {
//     username: 'Chris',
//     message: `Let's play some Apex, Nic. Really need you to carry me out of Bronze.`,
//     pfp: '/static/images/avatar/1.jpg',
//   },
//   {
//     username: 'Tyler',
//     message: `Who wants to have a cookout this weekend? I just got some furniture
//       for my backyard and would love to fire up the grill.`,
//     pfp: '/static/images/avatar/1.jpg',
//   },
// ]