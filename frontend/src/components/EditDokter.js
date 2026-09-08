import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../utils";
import "animate.css";
import "../styles/main.css";

function EditDokter() {
  const [namaDokter, setNamaDokter] = useState("");
  const [spesialis, setSpesialis] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDokterById();
  }, []);

  const getDokterById = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const response = await API.get(`/dokter/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setNamaDokter(response.data.nama_dokter);
      setSpesialis(response.data.spesialis);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data dokter.");
    }
  };

  const updateDokter = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      await API.put(
        `/dokter/${id}`,
        {
          nama_dokter: namaDokter,
          spesialis,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      navigate("/doctor");
    } catch (error) {
      console.error(error);
      alert("Gagal mengupdate data dokter. Pastikan kamu sudah login.");
    }
  };

  return (
    <motion.div
      className="columns mt-5 is-centered"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="column is-half">
        <div className="box p-5 animate__animated animate__fadeInUp custom-box-shadow">
          <h1 className="title has-text-centered has-text-info">
            🦷 Edit Dokter
          </h1>
          <p className="has-text-centered mb-4 has-text-grey">
            <i className="fas fa-tooth"></i> Pastikan data dokter sudah benar
          </p>
          <form onSubmit={updateDokter}>
            <div className="field">
              <label className="label">👨‍⚕️ Nama Dokter</label>
              <div className="control has-icons-left">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={namaDokter}
                  onChange={(e) => setNamaDokter(e.target.value)}
                  placeholder="Masukkan nama dokter"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-user-md"></i>
                </span>
              </div>
            </div>

            <div className="field">
              <label className="label">🩺 Spesialis</label>
              <div className="control has-icons-left">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={spesialis}
                  onChange={(e) => setSpesialis(e.target.value)}
                  placeholder="Masukkan spesialis"
                  required
                />
                <span className="icon is-left">
                  <i className="fas fa-stethoscope"></i>
                </span>
              </div>
            </div>

            <div className="field has-text-centered mt-5">
              <motion.button
                type="submit"
                className="button is-info is-medium is-rounded px-5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                💾 Update
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default EditDokter;