import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import {Box} from '@mui/material';
import { useState, useRef, useEffect } from 'react';




// Seeds sample messages
function refreshMessages() {
  return messageExamples;
}

export default function ProfileBody() {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const [messages, setMessages] = useState(() => refreshMessages());

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <List>
        {messages.map(({ username, message, pfp }, index) => (
          <ListItemButton key={index + pfp}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={pfp} />
            </ListItemAvatar>
            <ListItemText primary={username} secondary={message} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

// const messageExamples = [
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
//     message: `Can you give me that link for the aimbot you use?.`,
//     pfp: '/static/images/avatar/1.jpg',
//   },
//   {
//     username: 'Tyler',
//     message: `Who wants to have a cookout this weekend? I just got some furniture
//       for my backyard and would love to fire up the grill.`,
//     pfp: '/static/images/avatar/1.jpg',
//   },
// ];