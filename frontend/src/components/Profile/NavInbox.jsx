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
import { delete_Conversation } from '../../utils/mutation'

export default function NavInbox() {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const ref = useRef(null)
  const id = Auth.getProfile().data._id
  const [inbox, setInbox] = useState([])

  // Query users conversations
  const { loading, data, refetch } = useQuery(QUERY_SINGLE_USER_CONVERSATIONS, {
    variables: { userId: id },
    onCompleted: (data) => {
      if (data && data.userConversation) {
        console.log('Conversation Data Object:', data?.userConversation)
        setInbox(data.userConversation)
        console.log('Inbox: ', inbox)
      }
    },
  })

  const convoData = data?.userConversation || {}
  console.log('Convo Data: ', convoData)

  // Mutation to delete conversation and re-query conversations
  const [deleteConversation] = useMutation(delete_Conversation, {
    refetchQueries: [
      {
        query: QUERY_SINGLE_USER_CONVERSATIONS,
        variables: { userId: id },
      },
    ],
    onCompleted: (data) => {
      console.log('Delete Mutation Completed:', data)
    },
  })

  // Delete convo on Icon click
  const handleDeleteClick = async ({ conversationId, otherUserId, id }) => {
    try {
      console.log('Deleting convo: ', conversationId)
      await deleteConversation({
        variables: { conversationId, userId: id, otherUserId },
      })
      // MANUALLY refetch the conversation data (bc refetchQuery isn't working)
      await refetch()
      // // Update the local state to reflect the changes immediately
      // setInbox((prevInbox) =>
      //   prevInbox.filter((conversation) => conversation.id !== conversationId)
      // )
    } catch (error) {
      console.error('Error deleting conversation: ' + error.message)
    }
  }

  // useEffect(() => {}, [inbox])

  ////////// Don't touch:

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
  return (
    <Grid container xs={12} sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <Grid container>
          <List
            sx={{
              flex: '1',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {convoData.map((message) => {
              return (
                message.lastMessage && (
                  <>
                    <Grid item xs={11}>
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
                    </Grid>
                    <Grid item xs={1} sx={{ marginRight: 1.8}}>
                      <ListItemButton
                        onClick={() =>
                          handleDeleteClick({
                            conversationId: data.userConversation[0].id,
                            otherUserId: data.userConversation[0].otherUser._id,
                            id: id,
                          })
                        }
                      >
                        <DeleteForeverIcon />
                      </ListItemButton>
                    </Grid>
                  </>
                )
              )
            })}
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
}
