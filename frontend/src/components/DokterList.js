// src/pages/DokterList.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../utils";
import { motion } from "framer-motion";
import "animate.css";
import { FaTooth, FaEdit, FaTrash, FaArrowLeft, FaTimesCircle } from "react-icons/fa";
import "../styles/main.css";

const DokterList = () => {
  const [doctors, setDoctors] = useState([]);
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }

      const response = await API.get("/doctor", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setDoctors(response.data);
      setMsg("");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        setMsg("Akses ditolak. Silakan login ulang.");
      } else if (error.response?.status === 401) {
        setMsg("Token tidak valid atau sudah kadaluwarsa.");
      } else {
        setMsg("Gagal mengambil data dokter.");
      }
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }

      await API.delete(`/dokter/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      fetchDoctors();
    } catch (error) {
      console.error(error);
      setMsg("Gagal menghapus dokter.");
    }
  };

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedDoctor(null);
    setShowModal(false);
  };

  const confirmDelete = () => {
    deleteDoctor(selectedDoctor.id);
    closeModal();
  };

  return (
    <motion.div
      className="dokter-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="box animate__animated animate__fadeInUp">
        <h1 className="title has-text-centered has-text-primary">
          <FaTooth className="icon-tooth" /> Daftar Dokter Gigi
        </h1>
        {msg && <p className="has-text-danger has-text-centered">{msg}</p>}

        <div className="is-flex is-justify-content-space-between mb-4">
          <Link to="/dashboard" className="button is-light is-rounded">
            <FaArrowLeft className="mr-1" /> Kembali ke Dashboard
          </Link>
          <Link to="/add-doctor" className="button is-success is-rounded animate__animated animate__bounceIn">
            + Tambah Dokter
          </Link>
        </div>

        <table className="table is-fullwidth is-hoverable animate__animated animate__fadeIn">
          <thead>
            <tr className="has-background-primary-light">
              <th className="has-text-centered">No</th>
              <th>Nama</th>
              <th>Spesialisasi</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor, index) => (
                <motion.tr
                  key={doctor.id_dokter}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="has-text-centered">{index + 1}</td>
                  <td>{doctor.nama_dokter}</td>
                  <td>{doctor.spesialis}</td>
                  <td className="is-flex is-justify-content-center">
                    <button
                      onClick={() => navigate(`/edit-doctor/${doctor.id_dokter}`)}
                      className="button is-small is-info is-light is-rounded mr-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => openModal(doctor)}
                      className="button is-small is-danger is-light is-rounded"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="has-text-centered">
                  Tidak ada data dokter.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Modal Hapus */}
        {showModal && selectedDoctor && (
          <div className="modal is-active">
            <div className="modal-background" onClick={closeModal}></div>
            <motion.div
              className="modal-card custom-modal-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <header className="modal-card-head has-background-danger">
                <p className="modal-card-title has-text-white">Konfirmasi Hapus</p>
                <button className="delete" aria-label="close" onClick={closeModal}></button>
              </header>
              <section className="modal-card-body has-text-centered">
                <FaTimesCircle size={50} className="has-text-danger mb-3" />
                <p>Apakah kamu yakin ingin menghapus dokter <strong>{selectedDoctor.nama_dokter}</strong>?</p>
              </section>
              <footer className="modal-card-foot is-justify-content-center">
                <button className="button is-danger" onClick={confirmDelete}>
                  Ya, Hapus
                </button>
                <button className="button" onClick={closeModal}>
                  Batal
                </button>
              </footer>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DokterList;