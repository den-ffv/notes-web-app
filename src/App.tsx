import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import NotFaund from "./pages/NotFaund";

function App() {
  const [isAuth, setIsAuth] = useState<string | null>(
    localStorage.getItem("notesAuthToken")
  );

  useEffect(() => {}, [isAuth]);
  return (
    <>
      {isAuth ? (
        <Routes>
          <Route path='/home' element={<Home setIsAuth={setIsAuth} />} />
          <Route path='*' element={<NotFaund />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route
              path='/login'
              element={<LogIn setIsAuth={setIsAuth} />}
            ></Route>
            <Route
              path='/register'
              element={<Register setIsAuth={setIsAuth} />}
            ></Route>
            <Route path='*' element={<NotFaund />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
