import CssBaseline from '@mui/material/CssBaseline'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { useEffect, useState, useRef } from 'react'
import { QUERY_SINGLE_USER_CONVERSATIONS } from '../../utils/queries'
import { messageAdded } from '../../utils/subscriptions'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import SingleChat from '../SingleChat'
import Auth from '../../utils/auth'
import { Grid } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export default function NavInbox() {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const ref = useRef(null)
  const id = Auth.getProfile().data._id
  const [inbox, setInbox] = useState([])
  const { loading, data } = useQuery(QUERY_SINGLE_USER_CONVERSATIONS, {
    variables: { userId: id },
    onCompleted: (data) => {
      if (data && data.userConversation) {
        setInbox(data.userConversation)
      }
    },
  })

  // Click trashcan icon to delete conversation
  const deleteMessage = () => {
    console.log('deleting conversation: ')
  }

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
    setSelectedMessage(message)
  }

  if (loading) {
    return <p>loading...</p>
  }

  // Render a new component when a message is selected
  if (selectedMessage) {
    return <SingleChat message={selectedMessage} />
  }
  // console.log(data.userConversation)
  return (
    <Grid container>
      <Grid item xs={12} sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <List
            sx={{
              flex: '1',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {inbox &&
              inbox.map((message) => {
                return (
                  message.lastMessage && (
                    <ListItemButton
                      key={message.id}
                      onClick={() => handleClick(message.id)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={message.otherUser.username}
                          src={message.otherUser.username}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={message.otherUser.username}
                        secondary={message.lastMessage}
                      />
                    </ListItemButton>
                  )
                )
              })}
          </List>
          {data.userConversation && data.userConversation.length > 0 ? (
            <Box sx={{ width: '10%', display: 'flex' }}>
              <ListItemButton onClick={deleteMessage}>
                <DeleteForeverIcon />
              </ListItemButton>
            </Box>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  )
}
