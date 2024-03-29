import createTheme from '@mui/material/styles/createTheme'
import { ThemeProvider } from '@mui/material'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { onlineStatus } from './utils/mutation'
import { useEffect } from 'react'
import Auth from './utils/auth'
import { createHttpLink } from '@apollo/client'

// Custom Theme instance - Colors, Fonts, etc go here for global use/overriding default values
const theme = createTheme({
  palette: {
    primary: {
      main: '#013440',
    },
    secondary: {
      main: '#BBDDF2',
    },
    third: {
      main: '#e4ebf2',
    },
    fourth: {
      main: '#242526',
    },
  },
})

//Root Layout
import RootLayout from './layouts/RootLayout'

//Pages
import Home from './pages/Home'
import Signin from './pages/Signin'
import SignUp from './pages/Signup'
import Profile from './pages/Profile'
import Conversation from './pages/queryTest'
import Settings from './pages/Settings'
import ErrorPage from './pages/ErrorPage'
const httpLink = createHttpLink({
  uri: '/graphql',
});
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="Home" element={<Home />} />
      <Route path="Signup" element={<SignUp />} />
      <Route path="Signin" element={<Signin />} />
      <Route path="Profile/:id" element={<Profile />} />
      <Route path="conversation/:conversationId" element={<Conversation />} />
      <Route path="Settings" element={<Settings />} />
      <Route path='*' element={<ErrorPage />} />
    </Route>
  )
)

function App() {
  if (Auth.loggedIn()) {
    const id = Auth.getProfile().data._id
    const [userStatus] = useMutation(onlineStatus)
    useEffect(() => {
      const updateStatus = async (isOnline) => {
        try {
          await userStatus({
            variables: {
              userId: id,
              isOnline: isOnline,
            },
          })
        } catch (e) {
          console.log(e)
        }
      }

      if (Auth.loggedIn()) {
        updateStatus(true)
      }

      const pageClose = () => {
        if (Auth.loggedIn()) {
          updateStatus(false)
        }
      }

      window.addEventListener('beforeunload', pageClose)

      return () => {
        window.removeEventListener('beforeunload', pageClose)
      }
    }, [])
  }

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
