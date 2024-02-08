import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState, useRef } from 'react'
import { QUERY_SINGLE_USER_CONVERSATIONS } from '../../utlis/queries'
import { messageAdded } from '../../utlis/subscriptions'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import SingleChat from '../SingleChat'
import Auth from '../../utlis/auth'

export default function NavInbox() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const ref = useRef(null)
  const id = Auth.getProfile().data._id
  const [inbox, setInbox] = useState([])
  const { loading, data } = useQuery(QUERY_SINGLE_USER_CONVERSATIONS, {
    variables: { userId: id },
    onCompleted: (data) => {
      if (data && data.userConversation) {
        setInbox(data.userConversation)
      }
    }
  })

  // const { data: newMessage } = useSubscription(messageAdded, {
  //   variables: { conversationId: conversationId },
  // })

  // useEffect(() => {
  //   if (newMessage && newMessage.messageAdded) {
  //     const message = newMessage.messageAdded
  //     setMessages((prevMessages) => [...prevMessages, message])
  //   }
  // }, [newMessage])

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
  console.log(data.userConversation)
  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {inbox &&
          inbox.map((message) => {
            return (
              <>
                {message.lastMessage && (
                  <ListItemButton key={message.id} onClick={() => handleClick(message.id)}>
                    <ListItemAvatar>
                      <Avatar alt={message.otherUser.username} src={message.otherUser.username} />
                    </ListItemAvatar>
                    <ListItemText primary={message.otherUser.username} secondary={message.lastMessage} />
                  </ListItemButton>
                )}
              </>
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