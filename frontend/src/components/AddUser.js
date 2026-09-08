import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API } from "../utils";
import { FaUserPlus, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/main.css";
import 'animate.css';
import dentistImg from "../assets/dentist-login.png";

function AddUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const minLength = /.{8,}/;
    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /[0-9]/;

    if (!minLength.test(pwd)) return "Password harus minimal 8 karakter.";
    if (!upperCase.test(pwd)) return "Password harus mengandung huruf besar.";
    if (!lowerCase.test(pwd)) return "Password harus mengandung huruf kecil.";
    if (!number.test(pwd)) return "Password harus mengandung angka.";
    return "";
  };

  const saveUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const pwdError = validatePassword(password);
    if (pwdError) {
      setPasswordError(pwdError);
      return;
    }
    setPasswordError("");

    try {
      await API.post('/register', { username, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
      }
    }
  };

  return (
    <div className="columns mt-5 is-centered animate__animated animate__fadeInDown">
      <div className="column is-half">
        <div className="box p-5 custom-box">
          <div className="has-text-centered mb-4">
            <img src={dentistImg} alt="Dentist" className="dentist-img" />
          </div>
          <h1 className="title has-text-centered has-text-info mb-5">
            <FaUserPlus className="mr-2" /> Add New User
          </h1>
          <form onSubmit={saveUser}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  type="text"
                  className={`input is-medium is-rounded ${errorMessage ? 'is-danger' : ''}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
                <span className="icon is-small is-left">
                  <FaUserPlus />
                </span>
              </div>
              {errorMessage && (
                <p className="help is-danger mt-1">{errorMessage}</p>
              )}
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right" style={{ position: 'relative' }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className={`input is-medium is-rounded ${passwordError ? 'is-danger' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
                <span className="icon is-small is-left">
                  <FaLock />
                </span>
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    zIndex: 10,
                  }}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && (
                <p className="help is-danger mt-1">{passwordError}</p>
              )}
            </div>

            <div className="field has-text-centered mt-5">
              <button type="submit" className="button is-info is-medium is-rounded px-5">
                Save User
              </button>
            </div>
          </form>

          <div className="has-text-centered mt-4">
            <p>
              Sudah ada akun? <a href="/">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;