import React from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "/icon/search.svg";
import Note from "../components/Note/Note";
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
      <div className='content'>
        <h1>Home</h1>
        <div className='search'>
          <img className='icon search__img' src={searchIcon} alt='' />
          <input
            className='search__input'
            type='text'
            placeholder='Search'
          />
        </div>
        <div className='notes-content'>
          {
            <>
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
              <Note />
            </>
          }
        </div>
        <button onClick={logOut}>Log out</button>
      </div>
    </>
  );
};

export default Home;
