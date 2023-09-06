import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import NotFaund from "./pages/NotFaund";
import Sidebar from "./components/Sidebar/Sidebar";
import Settings from "./pages/Settings";
import User from "./pages/User";
import AddNote from "./pages/AddNote";
import MobileMenu from "./components/MobileMenu/MobileMenu";

function App() {
  const [isAuth, setIsAuth] = useState<string | null>(
    localStorage.getItem("notesAuthToken")
  );
  const [userData, setUserData] = useState<object>({});

  const [toHideSidebar, setToHideSidebar] = useState<boolean>(
    window.innerWidth > 760
  );
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  const [openPhomeMenu, setOpenPhoneMenu] = useState<boolean>(true);

  console.log(openPhomeMenu);

  type TypeSidebarItem = {
    id: number;
    count: number;
    href: string;
    value: string;
    icon: string;
  };

  const sidebarItems: TypeSidebarItem[] = [
    { id: 1, count: 0, href: "/home", value: "All Note", icon: "file.svg" },
    { id: 2, count: 0, href: "/starred", value: "Starred", icon: "star.svg" },
    // { id: 3, count: 0, href: "/archive", value: "Archive", icon: "archive.svg" },
    { id: 4, count: 0, href: "/bin", value: "Bin", icon: "trash.svg" },
    { id: 6, count: 0, href: "/settings", value: "Settings", icon: "gear.svg" },
  ];

  useEffect(() => {}, [isAuth]);

  return (
    <>
      {isAuth ? (
        <>
          <div className='window-wrapper wrapper'>
            <Sidebar
              userData={userData}
              setToHideSidebar={setToHideSidebar}
              sidebarItems={sidebarItems}
              toHideSidebar={toHideSidebar}
              setOpenMenu={setOpenMenu}
            />
            <main
              className={"main"}
              style={{
                marginLeft:
                  window.innerWidth >= 760 ? (toHideSidebar ? 300 : 100) : 10,
              }}
            >
              {/* {window.innerWidth <= 760 && (
                <p
                  className='go-back'
                  onClick={() => setOpenPhoneMenu((prev) => !prev)}
                >
                  {"="}
                </p>
              )} */}
              <div
                className='phone-menu-btn'
                onClick={() => setOpenPhoneMenu((prev) => !prev)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <MobileMenu
                sidebarItems={sidebarItems}
                openPhomeMenu={openPhomeMenu}
                setOpenPhoneMenu={setOpenPhoneMenu}
              />
              <Routes>
                <Route path='/home' element={<Home setIsAuth={setIsAuth} />} />
                <Route path='/user' element={<User />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/add' element={<AddNote />} />
                <Route path='*' element={<NotFaund />} />
              </Routes>
            </main>
          </div>
        </>
      ) : (
        <>
          <Routes>
            <Route
              path='/login'
              element={
                <LogIn setUserData={setUserData} setIsAuth={setIsAuth} />
              }
            ></Route>
            <Route
              path='/register'
              element={
                <Register setUserData={setUserData} setIsAuth={setIsAuth} />
              }
            ></Route>
            <Route path='*' element={<NotFaund />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
