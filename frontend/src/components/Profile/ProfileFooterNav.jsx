import React, { useEffect, useState } from 'react'
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Badge,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MailIcon from '@mui/icons-material/Mail'
import NavInbox from './NavInbox'
import NavProfile from './NavProfile'
import NavNew from './NavNew'
import PersonIcon from '@mui/icons-material/Person'

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
        setSelectedComponent(<NavNew />)
        break
      case 2:
        setSelectedComponent(<NavProfile />)
        break
      default:
        setSelectedComponent(null)
    }
  }

  useEffect(() => {
    setSelectedComponent(<NavProfile />)
  }, [])

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
            label="Profile"
            icon={<PersonIcon />}
            onClick={() => handleClick(2)}
          />
          <BottomNavigationAction
            label="Inbox"
            icon={<InboxIcon />}
            onClick={() => handleClick(0)}
          />

          <BottomNavigationAction
            label="New"
            icon={<AddCircleOutlineIcon />}
            onClick={() => handleClick(1)}
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
