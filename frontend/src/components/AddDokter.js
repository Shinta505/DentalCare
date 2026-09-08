// src/pages/AddDokter.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";
import { FaTooth } from "react-icons/fa"; // icon gigi
import { motion } from "framer-motion";
import "animate.css";
import "../styles/main.css";

function AddDokter() {
    const [nama_dokter, setNamaDokter] = useState("");
    const [spesialis, setSpesialis] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const saveDokter = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setMsg("Silakan login terlebih dahulu.");
                setLoading(false);
                return;
            }

            await API.post(
                "/add-doctor",
                { nama_dokter, spesialis },
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
            alert("Gagal menyimpan data dokter. Coba login ulang jika perlu.");
        }
        setLoading(false);
    };

    return (
        <motion.div
            className="add-dokter-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
        >
            <div className="form-box">
                <div className="header-icon">
                    <FaTooth size={50} color="#1E90FF" />
                </div>
                <h1 className="title">Tambah Dokter</h1>
                {msg && <p className="msg-error">{msg}</p>}
                <form onSubmit={saveDokter} className="form-input">
                    <div className="field">
                        <label>Nama Dokter</label>
                        <input
                            type="text"
                            value={nama_dokter}
                            onChange={(e) => setNamaDokter(e.target.value)}
                            placeholder="Masukkan nama dokter"
                            required
                            className="input-text"
                        />
                    </div>

                    <div className="field">
                        <label>Spesialis</label>
                        <input
                            type="text"
                            value={spesialis}
                            onChange={(e) => setSpesialis(e.target.value)}
                            placeholder="Masukkan spesialis"
                            required
                            className="input-text"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className={`btn-submit ${loading ? "animate__animated animate__pulse animate__infinite" : ""}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={loading}
                    >
                        {loading ? "Menyimpan..." : "Simpan"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}

export default AddDokter;