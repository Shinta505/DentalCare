import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../utils";
import { motion } from "framer-motion";
import "animate.css";
import "../styles/main.css";
import { FaTooth, FaCalendarAlt, FaMoneyBillWave, FaPills, FaUserInjured } from "react-icons/fa";

const PeriksaPasien = () => {
  const [tanggal_periksa, setTanggalPeriksa] = useState("");
  const [biaya_periksa, setBiayaPeriksa] = useState("");
  const [obatId, setObatId] = useState("");
  const [listObat, setListObat] = useState([]);
  const [pasien, setPasien] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetchPasien();
    fetchObat();
  }, []);

  const fetchPasien = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const res = await API.get(`/pasien/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setPasien(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchObat = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setMsg("Silakan login terlebih dahulu.");
      return;
    }
    const res = await API.get("/obat", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    setListObat(res.data);
  };

  const savePeriksa = async (e) => {
    e.preventDefault();
    if (!tanggal_periksa || !biaya_periksa || !obatId) {
      alert("Semua field harus diisi!");
      return;
    }
    const biayaPeriksa = parseFloat(biaya_periksa);
    if (isNaN(biayaPeriksa)) {
      alert("Biaya periksa harus berupa angka!");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await API.post("/add-periksa", {
        tanggal_periksa,
        biaya_periksa,
        pasienId: id,
        obatId,
      });

      const id_struk = res.data.id_struk;
      navigate(`/pasien/periksa/struk/${id_struk}`);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <motion.div
      className="columns mt-5 is-centered"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="column is-half animate__animated animate__fadeInUp">
        <div className="box p-5 shadow rounded-lg dental-form">
          <h1 className="title has-text-centered has-text-info">
            <FaTooth className="mr-2" /> Tambah Pemeriksaan
          </h1>
          <form onSubmit={savePeriksa}>
            <div className="field">
              <label className="label">
                <FaUserInjured className="mr-1" /> Pasien
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input is-info"
                  value={pasien?.nama || ""}
                  disabled
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <FaCalendarAlt className="mr-1" /> Tanggal Periksa
              </label>
              <div className="control">
                <input
                  type="datetime-local"
                  className="input is-info"
                  value={tanggal_periksa}
                  onChange={(e) => setTanggalPeriksa(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <FaMoneyBillWave className="mr-1" /> Biaya Periksa
              </label>
              <div className="control">
                <input
                  type="number"
                  className="input is-info"
                  value={biaya_periksa}
                  onChange={(e) => setBiayaPeriksa(Number(e.target.value))}
                  placeholder="Masukkan biaya periksa"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <FaPills className="mr-1" /> Obat
              </label>
              <div className="control">
                <div className="select is-fullwidth is-info">
                  <select
                    value={obatId}
                    onChange={(e) => setObatId(e.target.value)}
                    required
                  >
                    <option value="">Pilih Obat</option>
                    {listObat.map((obat) => (
                      <option key={obat.id_obat} value={obat.id_obat}>
                        {obat.nama_obat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="field has-text-centered">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="button is-success is-fullwidth mt-4"
              >
                Simpan Pemeriksaan
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default PeriksaPasien;