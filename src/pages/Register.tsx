import React, { useState } from "react";
import noteLogo from "/logo.svg";
import axios from "axios";
import "./Auth.scss";
import { useNavigate } from "react-router-dom";

type RegisterProps = {
  setUserData: React.Dispatch<React.SetStateAction<object>>;
  setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
};

const Register: React.FC<RegisterProps> =({setUserData ,setIsAuth })=>  {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const isFormValid = email && password && username && !submitting;

  const handelRegister = async () => {
    try {
      if (!isFormValid) {
        setSubmitting(true);
      }
      setErrorMessage("");
      const response = await axios.post(
        "http://localhost:5000/api/registration",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("notesAuthToken", response.data.token);
      setUserData(response.data)
      if (response.status === 200) {
        setIsAuth(localStorage.getItem('notesAuthToken'));
        navigate("/home");
      }
    } catch (err) {
      console.log((err as Error).response.data.errors.errors[0].msg);
      setErrorMessage((err as Error).response.data.errors.errors[0].msg)
    }
  };

  return (
    <>
      <button className='button-go-back' onClick={() => navigate(-1)}>
        ⬅️
      </button>
      <div className='auth'>
        <img src={noteLogo} alt='logo' />
        <p className='auth__title'>Welcome to NoteWave!</p>
        {errorMessage && (
          <div className='block-error'>
            <p className='error-message'>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")} className='error-close'>
              +
            </button>
          </div>
        )}
        <form className='auth__form'>
          <label>Enter your email*</label>
          <input
            className='auth__input'
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label>Create a password*</label>
          <input
            className='auth__input'
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <label>Enter a username*</label>
          <input
            className='auth__input'
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          <button
            onClick={handelRegister}
            type='button'
            className='form-button'
            disabled={!isFormValid}
          >
            {submitting ? "Creating..." : "Create account"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
