import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "animate.css";
import { API } from "../utils";
import "../styles/main.css"; // Pastikan main.css sudah ada

function EditObat() {
  const [namaObat, setNamaObat] = useState("");
  const [definisi, setDefinisi] = useState("");
  const [efekSamping, setEfekSamping] = useState("");
  const [harga, setHarga] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getObatById();
  }, []);

  const getObatById = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const response = await API.get(`/obat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setNamaObat(response.data.nama_obat);
      setDefinisi(response.data.definisi);
      setEfekSamping(response.data.efek_samping);
      setHarga(response.data.harga);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data obat.");
    }
  };

  const updateObat = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");

      await API.put(
        `/obat/${id}`,
        {
          nama_obat: namaObat,
          definisi,
          efek_samping: efekSamping,
          harga: parseInt(harga),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        },
      );

      navigate("/obat");
    } catch (error) {
      console.error(error);
      alert("Gagal mengupdate data obat. Pastikan kamu sudah login.");
    }
  };

  return (
    <div className="columns mt-5 is-centered animate__animated animate__fadeIn">
      <motion.div 
        className="column is-half"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="box p-5 custom-box-shadow">
          <h1 className="title has-text-centered has-text-info animate__animated animate__bounceInDown">
            🦷✨ Edit Obat
          </h1>
          {msg && (
            <div className="notification is-danger animate__animated animate__fadeIn">
              {msg}
            </div>
          )}
          <form onSubmit={updateObat}>
            <div className="field">
              <label className="label">🧪 Nama Obat</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={namaObat}
                  onChange={(e) => setNamaObat(e.target.value)}
                  placeholder="Masukkan nama obat"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">📖 Definisi</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={definisi}
                  onChange={(e) => setDefinisi(e.target.value)}
                  placeholder="Masukkan definisi obat"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">⚠️ Efek Samping</label>
              <div className="control">
                <input
                  type="text"
                  className="input is-medium is-rounded"
                  value={efekSamping}
                  onChange={(e) => setEfekSamping(e.target.value)}
                  placeholder="Masukkan efek samping"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">💰 Harga</label>
              <div className="control">
                <input
                  type="number"
                  className="input is-medium is-rounded"
                  value={harga}
                  onChange={(e) => setHarga(e.target.value)}
                  placeholder="Masukkan harga"
                  required
                />
              </div>
            </div>

            <motion.div 
              className="field has-text-centered mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button type="submit" className="button is-info is-medium is-rounded px-6">
                💾 Simpan
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default EditObat;