import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import InboxIcon from '@mui/icons-material/Inbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Box} from '@mui/material';
import { useState, useRef, useEffect } from 'react';

// Seeds messages
function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(4)).map(
    () => messageExamples[getRandomInt(messageExamples.length)],
  );
}

export default function ProfileContent() {
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
        {messages.map(({ primary, secondary, pfp }, index) => (
          <ListItemButton key={index + pfp}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={pfp} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItemButton>
        ))}
      </List>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Inbox" icon={<InboxIcon />} />
          <BottomNavigationAction label="Start New" icon={<AddCircleOutlineIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

const messageExamples = [
  {
    primary: "Kevin", // USERNAME
    secondary: 'I love otters.', // CONTENT
    pfp: '/static/images/avatar/4.jpg', // PFP
  },
  {
    primary: 'Nic',
    secondary: `My back hurts.`,
    pfp: '/static/images/avatar/5.jpg',
  },
  {
    primary: 'Chris',
    secondary: `Let's play some Apex, Nic. Really need you to carry me out of Bronze.`,
    pfp: '/static/images/avatar/1.jpg',
  },
  {
    primary: 'Tyler',
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    pfp: '/static/images/avatar/1.jpg',
  },
];