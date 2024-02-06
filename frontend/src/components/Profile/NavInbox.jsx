import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState, useRef } from 'react'
import { QUERY_CONVERSATION } from '../../utlis/queries'
import { messageAdded } from '../../utlis/subscriptions'
import { addMessage } from '../../utlis/mutation'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

export default function NavInbox() {
  const [value, setValue] = useState(0)
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
  if (loading) {
    return <p>loading...</p>
  }
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messages &&
          messages.map(({ content, sender }, index) => (
            <ListItemButton key={index + sender._id}>
              <ListItemAvatar>
                <Avatar alt="Profile Picture" src={sender.pfp} />
              </ListItemAvatar>
              <ListItemText primary={sender._id} secondary={content} />
            </ListItemButton>
          ))}
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
// ];
