import React, { useState } from "react";
import axios from "axios";
import noteLogo from "/logo.svg";
import "./Auth.scss";
import { Link, useNavigate } from "react-router-dom";

type LogInProps = {
  setIsAuth: React.Dispatch<React.SetStateAction<string | null>>;
};

const LogIn: React.FC<LogInProps> = ({ setIsAuth }) => {
  const [email, setEmail] = useState<string>("user@user.com");
  const [password, setPassword] = useState<string>("useruser");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const isFormValid = email && password && !submitting;

  const navigate = useNavigate();

  const closeError = () => {
    setError("");
  };

  const handelLogin = async () => {
    try {
      setSubmitting(true);
      setError("");
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("notesAuthToken", response.data.token);
      console.log(response);
      if (response.status === 200) {
        setIsAuth(localStorage.getItem('notesAuthToken'));
        navigate("/home");
      }
    } catch (err) {
      setError("Incorrect username or password.");
      console.error("Authorization error", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='auth'>
      <img src={noteLogo} alt='logo' />
      <p className='auth__title'>Sign in to NoteWave</p>
      {error && (
        <div className='block-error'>
          <p className='error-message'>{error}</p>
          <button onClick={closeError} className='error-close'>
            +
          </button>
        </div>
      )}
      <form className='auth__form'>
        <label>Email address</label>
        <input
          className='auth__input'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className='auth__input'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handelLogin}
          type='button'
          className='form-button'
          disabled={!isFormValid}
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <div className='block-create-acc'>
        <p>
          New to GitHub?
          <Link className='block-create-acc__link' to={"/register"}>
            Create an account.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
