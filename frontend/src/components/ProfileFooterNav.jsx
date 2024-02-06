import { Paper, BottomNavigation, BottomNavigationAction } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useState } from "react";


export default function ProfileFooterNav () {
  const [value, setValue] = useState(0);
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Inbox" icon={<InboxIcon />} />
          <BottomNavigationAction label="New" icon={<AddCircleOutlineIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
          <BottomNavigationAction label="Profile" icon={<ArchiveIcon />} /> 
        </BottomNavigation>
      </Paper>
    )
}