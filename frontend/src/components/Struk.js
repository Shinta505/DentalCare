import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../utils";
import { motion } from "framer-motion";
import "animate.css";
import {
  FaTooth,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPills,
  FaCheckCircle,
  FaUser,
} from "react-icons/fa";
import "../styles/main.css";

const Struk = () => {
  const { id_struk } = useParams();
  const [struk, setStruk] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id_struk) {
      fetchStruk();
    }
  }, [id_struk]);

  const fetchStruk = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const res = await API.get(`/pasien/periksa/struk/${id_struk}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setStruk(res.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching struk data:", error);
      setError("Gagal memuat struk. Coba lagi nanti.");
    }
  };

  const handleSelesai = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      await API.put(
        `/struk/${id_struk}`,
        { status: "Selesai" },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      navigate("/historypasien");
    } catch (error) {
      console.error("Gagal menyelesaikan struk:", error);
    }
  };

  return (
    <div className="columns is-centered mt-6 animate__animated animate__fadeIn">
      <div className="column is-half">
        {error && <div className="notification is-danger">{error}</div>}

        {struk ? (
          <motion.div
            className="box custom-dental-box p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1
              className="title has-text-centered has-text-weight-bold is-3 mb-5"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FaTooth className="mr-2" style={{ color: "#48c9b0" }} />
              Struk Pemeriksaan Gigi
            </motion.h1>

            <div className="content dental-content">
              <p>
                <FaUser className="icon-left" />
                <strong>Nama Pasien:</strong> {struk?.pasien?.nama}
              </p>
              <p>
                <FaCalendarAlt className="icon-left" />
                <strong>Tanggal Periksa:</strong> {struk?.periksa?.tanggal_periksa}
              </p>
              <p>
                <FaMoneyBillWave className="icon-left" />
                <strong>Biaya Periksa:</strong> Rp{struk?.periksa?.biaya_periksa?.toLocaleString()}
              </p>
              <p>
                <FaPills className="icon-left" />
                <strong>Obat:</strong> {struk?.obat?.nama_obat}
              </p>
              <p>
                💊 <strong>Harga Obat:</strong> Rp{struk?.obat?.harga?.toLocaleString()}
              </p>
              <p className="has-text-weight-bold has-text-primary">
                <FaMoneyBillWave className="icon-left" />
                Total Biaya: Rp{struk?.total_biaya?.toLocaleString()}
              </p>
            </div>

            {struk.status !== "Selesai" && (
              <motion.button
                className="button is-link mt-4 is-fullwidth is-medium animate__animated animate__pulse animate__infinite"
                onClick={handleSelesai}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaCheckCircle className="mr-2" />
                Tandai Selesai
              </motion.button>
            )}
          </motion.div>
        ) : (
          <div className="has-text-centered">
            <span className="is-size-5 animate__animated animate__pulse animate__infinite">
              Memuat data struk...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Struk;