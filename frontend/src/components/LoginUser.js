import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API } from "../utils";
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'animate.css';
import '../styles/main.css';
import dentistImage from '../assets/dentist-login.png';

function LoginUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    setErrors({ username: "", password: "", general: "" });

    try {
      const response = await API.post('/login', { username, password }, { withCredentials: true });
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.data) {
        const data = error.response.data;
        if (data.field === 'username' || data.field === 'password') {
          setErrors(prev => ({ ...prev, [data.field]: data.message }));
        } else {
          setErrors(prev => ({ ...prev, general: "Login gagal. Silakan periksa username/password." }));
        }
      } else {
        setErrors(prev => ({ ...prev, general: "Terjadi kesalahan jaringan atau server." }));
      }
    }
  };

  const goToSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="columns mt-5 is-centered animate__animated animate__fadeIn">
      <div className="column is-half">
        <motion.div
          className="box p-5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="has-text-centered mb-4">
            <img
              src={dentistImage}
              alt="Dental Login"
              style={{ maxWidth: '120px', borderRadius: '50%', marginBottom: '1rem' }}
            />
            <h1 className="title has-text-info">Selamat Datang 👋</h1>
            <p className="subtitle is-6">Silakan login untuk masuk ke klinik gigi</p>
          </div>

          <form onSubmit={loginUser}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  type="text"
                  className={`input is-medium is-rounded ${errors.username ? "is-danger" : ""}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  required
                />
                <span className="icon is-left">
                  <FaUser />
                </span>
              </div>
              {errors.username && <p className="help is-danger">{errors.username}</p>}
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left has-icons-right" style={{ position: 'relative' }}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  className={`input is-medium is-rounded ${errors.password ? "is-danger" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                />
                <span className="icon is-left">
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
                  aria-label={passwordVisible ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="help is-danger">{errors.password}</p>}
            </div>

            {errors.general && (
              <p className="has-text-danger has-text-centered mb-3">{errors.general}</p>
            )}

            <div className="field has-text-centered mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="button is-link is-medium is-rounded px-5"
              >
                Login
              </motion.button>
            </div>
          </form>

          <div className="has-text-centered mt-4">
            <p>Belum punya akun?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={goToSignUp}
              className="button is-light is-rounded mt-2"
            >
              Daftar Sekarang
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginUser;