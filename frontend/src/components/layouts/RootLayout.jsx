// // Header + Footer components
// Every 'page' will render with this layout through Outlet. Like a content 'wrapper'
import { Outlet } from "react-router-dom";
import NavBar from "../Navbar";

export default function RootLayout() {
  return (
    <>
      {/* fragment <> needed to ensure single element is produced*/}
      <NavBar/>

      <main>
        <Outlet />
      </main>

      {/* Footer component to be added */}
    </>
  );
}
