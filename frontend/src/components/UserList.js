import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API } from "../utils";
import { motion } from "framer-motion";
import "animate.css";
import "../styles/main.css";
import { FaTooth, FaUserPlus, FaTrash } from "react-icons/fa";

const UserList = () => {
  const [users, setUser] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMsg("Silakan login terlebih dahulu.");
      return;
    }
    const response = await API.get(`/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    setUser(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      className="columns mt-5 is-centered"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="column is-8 box custom-box animate__animated animate__fadeInUp">
        <h1 className="title has-text-centered has-text-link-dark is-flex is-align-items-center is-justify-content-center">
          <FaTooth className="mr-2" /> User List
        </h1>
        <p className="has-text-danger has-text-centered">{msg}</p>

        <div className="is-flex is-justify-content-space-between mb-4">
          <Link to={`add`} className="button is-info is-rounded">
            <FaUserPlus className="mr-2" /> Add User
          </Link>
        </div>

        <table className="table is-striped is-fullwidth is-hoverable is-bordered">
          <thead>
            <tr className="has-background-link-light">
              <th className="has-text-centered">No</th>
              <th>Username</th>
              <th>Password</th>
              <th className="has-text-centered">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <td className="has-text-centered">{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td className="has-text-centered">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="button is-small is-danger is-light is-rounded animate__animated animate__shakeX"
                  >
                    <FaTrash className="mr-1" /> Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserList;