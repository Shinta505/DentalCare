import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";

import { motion } from "framer-motion";
import "animate.css";

import { FaTooth, FaPills } from "react-icons/fa";
import "../styles/main.css";

const AddObat = () => {
  const [nama_obat, setNama] = useState("");
  const [definisi, setDefinisi] = useState("");
  const [efek_samping, setEfekSamping] = useState("");
  const [harga, setHarga] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveObat = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }

      await API.post(
        "/add-obat",
        {
          nama_obat,
          definisi,
          efek_samping,
          harga: parseInt(harga),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      navigate("/obat");
    } catch (error) {
      console.error("Error saving obat data:", error);
      setMsg("Gagal menyimpan data obat.");
    }
  };

  return (
    <motion.div
      className="add-obat-container animate__animated animate__fadeIn"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="form-box">
        <div className="title-wrapper">
          <FaTooth size={30} className="icon-tooth" />
          <h2 className="title">Tambah Data Obat</h2>
          <FaPills size={30} className="icon-tooth" />
        </div>

        {msg && <div className="notification-custom">{msg}</div>}

        <form onSubmit={saveObat} className="form-input">
          <div className="field">
            <label htmlFor="nama_obat">Nama Obat</label>
            <input
              type="text"
              id="nama_obat"
              className="input-text"
              value={nama_obat}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Masukkan nama obat"
            />
          </div>

          <div className="field">
            <label htmlFor="definisi">Definisi</label>
            <input
              type="text"
              id="definisi"
              className="input-text"
              value={definisi}
              onChange={(e) => setDefinisi(e.target.value)}
              required
              placeholder="Deskripsi obat"
            />
          </div>

          <div className="field">
            <label htmlFor="efek_samping">Efek Samping</label>
            <input
              type="text"
              id="efek_samping"
              className="input-text"
              value={efek_samping}
              onChange={(e) => setEfekSamping(e.target.value)}
              required
              placeholder="Efek samping jika ada"
            />
          </div>

          <div className="field">
            <label htmlFor="harga">Harga</label>
            <input
              type="number"
              id="harga"
              className="input-text"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              required
              placeholder="Masukkan harga obat"
              min={0}
            />
          </div>

          <motion.button
            type="submit"
            className="btn-submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Simpan Data Obat
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddObat;