import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import "animate.css";
import "../styles/main.css";
import { API } from "../utils";
import ToothIcon from "../assets/tooth-icon.png";

const ObatList = () => {
  const navigate = useNavigate();
  const [obat, setObat] = useState([]);
  const [msg, setMsg] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null); // obat yang akan dihapus
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setMsg("Silakan login terlebih dahulu.");
          return;
        }
        const response = await API.get("/obat", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setObat(response.data);
      } catch (error) {
        console.error("Gagal mengambil data obat:", error);
      }
    };
    fetchObat();
  }, []);

  const navigateToDashboard = () => navigate("/dashboard");
  const handleTambah = () => navigate("/add-obat");
  const handleEdit = (item) => navigate(`/obat/edit/${item.id_obat}`);

  // Tombol hapus yang hanya buka modal, belum langsung delete
  const confirmDelete = (item) => {
    setDeleteTarget(item);
  };

  const handleCancelDelete = () => {
    setDeleteTarget(null);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("accessToken");
      await API.delete(`/obat/${deleteTarget.id_obat}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setObat(obat.filter((o) => o.id_obat !== deleteTarget.id_obat));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Gagal menghapus obat:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      className="container mt-6 animate__animated animate__fadeIn"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header dan tombol kembali + tambah */}
      <div className="level mb-4">
        <div className="level-left title-wrapper">
          <img src={ToothIcon} alt="tooth-icon" className="icon-gigi" />
          <h1 className="title is-3">Daftar Obat Klinik Gigi</h1>
        </div>
        <div className="level-right">
          <button
            onClick={navigateToDashboard}
            className="button is-light mr-2"
            title="Kembali ke Dashboard"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FiHome className="h-5 w-5" />
          </button>
          <motion.button
            onClick={handleTambah}
            className="button is-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FiPlus className="h-5 w-5 mr-1" /> Tambah Obat
          </motion.button>
        </div>
      </div>

      {msg && <p className="has-text-danger">{msg}</p>}

      {/* Tabel daftar obat */}
      <div className="table-container">
        <motion.table
          className="table is-bordered is-striped is-hoverable is-fullwidth animate__animated animate__zoomIn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Nama Obat</th>
              <th>Definisi</th>
              <th>Efek Samping</th>
              <th>Harga</th>
              <th className="has-text-centered">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {obat.length ? (
              obat.map((item, idx) => (
                <motion.tr
                  key={item.id_obat}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <td>{idx + 1}</td>
                  <td>{item.nama_obat}</td>
                  <td>{item.definisi}</td>
                  <td>{item.efek_samping}</td>
                  <td>{item.harga}</td>
                  <td className="has-text-centered">
                    <motion.button
                      className="button is-small is-info mr-1"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleEdit(item)}
                      title="Edit Obat"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      className="button is-small is-danger"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => confirmDelete(item)}
                      title="Hapus Obat"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="has-text-centered has-text-grey">
                  Tidak ada data obat.
                </td>
              </tr>
            )}
          </tbody>
        </motion.table>
      </div>

      {/* Modal konfirmasi hapus */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            className="modal is-active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ backgroundColor: "rgba(10, 10, 10, 0.86)" }}
          >
            <div
              className="modal-background"
              onClick={handleCancelDelete}
            ></div>
            <motion.div
              className="modal-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <header className="modal-card-head">
                <p className="modal-card-title">Konfirmasi Hapus</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={handleCancelDelete}
                ></button>
              </header>
              <section className="modal-card-body">
                <p>
                  Apakah kamu yakin ingin menghapus obat{" "}
                  <strong>{deleteTarget.nama_obat}</strong>?
                </p>
              </section>
              <footer className="modal-card-foot is-justify-content-space-between">
                <button
                  className="button is-light"
                  onClick={navigateToDashboard}
                  title="Kembali ke Dashboard"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <FiHome className="h-5 w-5 mr-1" /> Dashboard
                </button>
                <div>
                  <button
                    className="button"
                    onClick={handleCancelDelete}
                    disabled={isDeleting}
                  >
                    Batal
                  </button>
                  <button
                    className="button is-danger ml-2"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Menghapus..." : "Hapus"}
                  </button>
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ObatList;