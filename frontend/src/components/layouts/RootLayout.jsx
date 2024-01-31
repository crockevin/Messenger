// All pages/components will render with this layout
import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar'

export default function RootLayout() {
  return (
    <>
      {/* fragment <> needed to ensure single element is produced*/}
      <NavBar />
      <Outlet />

      {/* Footer component to be added */}
    </>
  )
}
