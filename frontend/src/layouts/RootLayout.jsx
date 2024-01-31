// All pages/components will render with this layout
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <>
      {/* fragment <> needed to ensure single element is produced*/}
      
      <Outlet />

      {/* Footer component to be added */}
    </>
  )
}
