import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { API } from "../utils";
import "../styles/main.css";

import {
  FaTooth,
  FaUserPlus,
  FaNotesMedical,
  FaPen,
  FaTrashAlt,
  FaArrowLeft,
} from "react-icons/fa";

const PasienList = () => {
  const [pasien, setPasien] = useState([]);
  const [dokterList, setDokterList] = useState([]);
  const [msg, setMsg] = useState("");  // Untuk pesan error/info

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPasien, setSelectedPasien] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getPasien();
    getDokter();
  }, []);

  const getPasien = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const response = await API.get("/pasien", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (!response.data || response.data.length === 0) {
        setMsg("Data pasien tidak tersedia.");
        setPasien([]);
      } else {
        setPasien(response.data);
        setMsg("");
      }
    } catch (error) {
      console.log(error);
      setMsg("Gagal mengambil data pasien. Silakan coba lagi.");
      setPasien([]);
    }
  };

  const getDokter = async () => {
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

      if (!response.data || response.data.length === 0) {
        setMsg("Data dokter tidak tersedia.");
        setDokterList([]);
      } else {
        setDokterList(response.data);
        // Jangan timpa pesan error pasien kalau sudah clear
        if (!pasien.length) setMsg("");
      }
    } catch (error) {
      console.log(error);
      setMsg("Gagal mengambil data dokter. Silakan coba lagi.");
      setDokterList([]);
    }
  };

  const confirmDelete = (pasien) => {
    setSelectedPasien(pasien);
    setModalVisible(true);
  };

  const deletePasien = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        setModalVisible(false);
        return;
      }
      await API.delete(`/pasien/${selectedPasien.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setModalVisible(false);
      setSelectedPasien(null);
      setMsg("Data pasien berhasil dihapus.");
      getPasien();
    } catch (error) {
      console.log(error);
      setMsg("Gagal menghapus data pasien. Silakan coba lagi.");
      setModalVisible(false);
    }
  };

  return (
    <>
      <motion.div
        className="columns mt-5 is-centered"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="column is-full table-container animate__animated animate__fadeInUp">
          <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
            <h2 className="title is-flex is-align-items-center">
              <FaTooth style={{ marginRight: 10 }} />
              Daftar Pasien Klinik Gigi
            </h2>
            <button
              className="button is-link is-light is-flex is-align-items-center"
              onClick={() => navigate("/dashboard")}
              title="Kembali ke Dashboard"
            >
              <FaArrowLeft style={{ marginRight: 6 }} />
              Dashboard
            </button>
          </div>

          <Link
            to={"add"}
            className="button is-primary mb-4 is-flex is-align-items-center"
          >
            <FaUserPlus style={{ marginRight: 8 }} />
            Tambah Pasien
          </Link>

          {/* Tampilkan pesan error atau info */}
          {msg && (
            <div className="notification is-warning is-light">
              {msg}
            </div>
          )}

          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Tanggal Lahir</th>
                <th>Jenis Kelamin</th>
                <th>No. Telepon</th>
                <th>Alamat</th>
                <th>Nama Dokter</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {pasien.length === 0 ? (
                <tr>
                  <td colSpan={8} className="has-text-centered">
                    Tidak ada data pasien.
                  </td>
                </tr>
              ) : (
                pasien.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.tgl_lahir}</td>
                    <td>{item.gender}</td>
                    <td>{item.no_telp}</td>
                    <td>{item.alamat}</td>
                    <td>{item.dokter?.nama_dokter || "-"}</td>
                    <td>
                      <div className="buttons is-centered">
                        <Link
                          to={`periksa/${item.id}`}
                          className="button is-small is-primary is-flex is-align-items-center"
                          title="Periksa"
                        >
                          <FaNotesMedical />
                        </Link>
                        <Link
                          to={`edit/${item.id}`}
                          className="button is-small is-info is-flex is-align-items-center"
                          title="Edit"
                        >
                          <FaPen />
                        </Link>
                        <button
                          onClick={() => confirmDelete(item)}
                          className="button is-small is-danger is-flex is-align-items-center"
                          title="Hapus"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {modalVisible && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setModalVisible(false)}
          ></div>
          <div className="modal-card" style={{ maxWidth: "400px" }}>
            <header className="modal-card-head">
              <p className="modal-card-title">Konfirmasi Hapus Pasien</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setModalVisible(false)}
              ></button>
            </header>
            <section className="modal-card-body has-text-centered">
              <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem" }}>
                Apakah Anda yakin ingin menghapus pasien{" "}
                <strong>{selectedPasien?.nama}</strong>?
              </p>
              <button
                className="button is-danger is-fullwidth"
                onClick={deletePasien}
                style={{ marginBottom: "1rem" }}
              >
                <FaTrashAlt style={{ marginRight: 8 }} />
                Hapus
              </button>
              <button
                className="button is-light is-fullwidth"
                onClick={() => setModalVisible(false)}
              >
                Batal
              </button>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default PasienList;