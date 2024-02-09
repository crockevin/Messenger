import { useParams } from "react-router-dom"
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'

import { Typography, Box, Button } from "@mui/material"
import { Avatar } from "@mui/material"
import Grid from '@mui/material/Grid'

import { QUERY_SINGLE_USER } from "../../utlis/queries"
import auth from "../../utlis/auth"

export default function NavProfile () {
    const { id } = useParams()
    console.log(`User id: ${id}`)

    // boolean to check if profile is yours
    const sameUser = id == auth.getProfile().data._id
  
    const {loading, data} = useQuery(QUERY_SINGLE_USER, {
      variables: { id: id },
    })
    // useEffect(() => {
    // //   console.log(data)  
    //   loadUser()
    // }, [loadUser])
  
    // if (error) {
    //   console.error('GraphQL Error:', error)
    //   return <p>Error fetching data</p>
    // }
  
    if (loading) {
      return <p>Loading...</p> // Replace with loading spinner
    }
    const user = data?.user // Access the 'username' field from the response data
    console.log(user)
    return (
<Grid 
    container
    direction={"column"}
    justifyContent="center"
    alignItems="center"
    rowSpacing={3}
    sx={{ minHeight: '30vh'}}
    >
    <Grid item xs={3}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Grid>
    <Grid item>
        <Typography>
       {user.username}
       </Typography>
    </Grid>
    
    {/* send friend request */}
    <Grid item>
        {!sameUser ? (
          <Button
          color="primary"
          variant="contained"
          type="signup"
          href="#">
          Add Friend
          </Button> 
        ) : (
          <Button
          color="primary"
          variant="contained"
          type="signup"
          href="/settings">
          Edit Profile
          </Button>
        ) }
    </Grid>
</Grid>
)
}