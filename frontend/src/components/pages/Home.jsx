import NavBar from '../Navbar'
import { Typography } from '@mui/material'
import {Button} from '@mui/material'
import {ButtonGroup} from '@mui/material'
import {Container} from '@mui/material'





export default function Home() {



  return (
    <Container>
      <Typography 
      variant='h2'
      align='center' 
      color='primary'
      gutterBottom>
        Home Page
      </Typography>

      <Typography

      color='textSecondary'
      align='center'
      gutterBottom
      
      >
        🐏 Ram ranch, baby. Here, we ram ram ram, ram some more, then we keep rammin' til aint no more ram left in us. Ram on. 🐏
      </Typography>

      <ButtonGroup
      
      color='primary'
      variant='contained'
      >
        <Button
        type='signup'
        href='/signup'
        >Signup</Button>
        <Button
        type='signin'
        href='signin'
        >Signin</Button>
      </ButtonGroup>
    </Container>

  )
}
