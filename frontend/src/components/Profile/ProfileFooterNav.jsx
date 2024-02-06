import React, { useState } from 'react'
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ArchiveIcon from '@mui/icons-material/Archive'
import MailIcon from '@mui/icons-material/Mail'
import NavInbox from './NavInbox'
import NavProfile from './NavProfile'
import NavArchive from './NavArchive'
import NavNew from './NavNew'

export default function ProfileFooterNav() {
  const [value, setValue] = useState(0)
  const [selectedComponent, setSelectedComponent] = useState(null)

  const handleClick = (index) => {
    setValue(index)
    switch (index) {
      case 0:
        setSelectedComponent(<NavInbox />)
        break
      case 1:
        setSelectedComponent(<NavArchive />)
        break
      case 2:
        setSelectedComponent(<NavNew />)
        break
      case 3:
        setSelectedComponent(<NavProfile />)
        break
      // case 4:
      //   setSelectedComponent(<TestComponent />)
      //   break
      default:
        setSelectedComponent(null)
    }
  }

  return (
    <div>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            handleClick(newValue)
          }}
        >
          <BottomNavigationAction
            label="Inbox"
            icon={<InboxIcon />}
            onClick={() => handleClick(0)}
          />
          <BottomNavigationAction
            label="Archive"
            icon={<ArchiveIcon />}
            onClick={() => handleClick(2)}
          />
             <BottomNavigationAction
            label="New"
            icon={<AddCircleOutlineIcon />}
            onClick={() => handleClick(1)}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<ArchiveIcon />}
            onClick={() => handleClick(3)}
          />
          {/* <Badge badgeContent={1} color="primary">
            <BottomNavigationAction
              label="Test"
              icon={<MailIcon />}
              onClick={() => handleClick(4)}
            />
          </Badge> */}
        </BottomNavigation>
      </Paper>
      {selectedComponent}
    </div>
  )
}

// Define your separate components
