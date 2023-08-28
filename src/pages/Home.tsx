import React from "react";
import { useNavigate } from "react-router-dom";

type TypeHomeProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
};

const Home: React.FC<TypeHomeProps> = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const logOut = () => {
    setIsAuth(null);
    navigate("/login");
    localStorage.removeItem("notesAuthToken");
  };
  return (
    <>
      <div>Home</div>
      <button onClick={logOut}>Log out</button>
    </>
  );
};

export default Home;
