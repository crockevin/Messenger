import { createTheme, ThemeProvider } from '@mui/material'
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='Home' element={<Home/>} />
      <Route path='Signup' element={<SignUp/>} />
      <Route path='Signin' element={<Signin/>} />
      <Route path='Profile' element={<Profile/>} />
    </Route>
  )
)

function App() {
  return (
    
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App