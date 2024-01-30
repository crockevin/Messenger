import { useEffect, useState } from 'react'
import { QUERY_USERS } from './utlis/queries'
import { useQuery } from '@apollo/client'
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//root layout
import RootLayout from './components/layouts/RootLayout';


//pages
import Home from './components/pages/Home';
import Signin from './components/pages/Signin';
import SignUp from './components/pages/Signup';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home />} />
      <Route path="Home" element={<Home />} />
      <Route path="Signin" element={<Signin />} />
      <Route path='Signup' element={<SignUp/>} />
    </Route>
  )
);


function App() {
  return <RouterProvider router={router} />;
}


export default App
