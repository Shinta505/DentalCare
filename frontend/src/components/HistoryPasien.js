import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import "animate.css";
import "../styles/main.css";
import { API } from "../utils";

const HistoryPasien = () => {
    const [struks, setStruks] = useState([]);
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const fetchSelesaiStruks = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    setMsg("Silakan login terlebih dahulu.");
                    return;
                }
                const res = await API.get("/struk/selesai", {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setStruks(res.data);
            } catch (err) {
                console.error("Gagal mengambil data history pasien:", err.message);
            }
        };
        fetchSelesaiStruks();
    }, []);

    const navigateToDashboard = () => {
        navigate("/dashboard");
    };

    // Fungsi untuk buka modal hapus dan simpan id yang dipilih
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    // Fungsi hapus data dari API
    const confirmDelete = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setMsg("Silakan login terlebih dahulu.");
                setShowModal(false);
                return;
            }
            await API.delete(`/struk/${selectedId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            // Update state untuk menghapus data yang sudah dihapus
            setStruks(struks.filter((struk) => struk.id_struk !== selectedId));
            setMsg("Data berhasil dihapus.");
        } catch (err) {
            setMsg("Gagal menghapus data.");
            console.error(err);
        } finally {
            setShowModal(false);
            setSelectedId(null);
        }
    };

    // Tutup modal
    const cancelDelete = () => {
        setShowModal(false);
        setSelectedId(null);
    };

    return (
        <motion.div
            className="container mt-6 animate__animated animate__fadeInUp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="level mb-4 is-flex is-align-items-center">
                <div className="level-left">
                    <button
                        onClick={navigateToDashboard}
                        className="button is-link is-light mr-3 is-flex is-align-items-center"
                        title="Kembali ke Dashboard"
                    >
                        <span className="icon is-small">
                            <HomeIcon className="h-5 w-5" />
                        </span>
                    </button>
                    <h1 className="title is-3 has-text-info is-flex is-align-items-center">
                        <span role="img" aria-label="dental-icon" className="mr-2">
                            🦷
                        </span>
                        Riwayat Pemeriksaan Pasien
                    </h1>
                </div>
            </div>

            {msg && <div className="notification is-warning is-light">{msg}</div>}

            <div className="table-container box animate__animated animate__fadeIn">
                <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                    <thead className="has-background-link-light">
                        <tr>
                            <th>#</th>
                            <th>Nama Pasien</th>
                            <th>Tanggal Periksa</th>
                            <th>Biaya Periksa</th>
                            <th>Obat</th>
                            <th>Harga Obat</th>
                            <th>Total Biaya</th>
                            <th>Aksi</th> {/* Tambah kolom aksi untuk tombol hapus */}
                        </tr>
                    </thead>
                    <tbody>
                        {struks.length > 0 ? (
                            struks.map((struk, index) => (
                                <tr key={struk.id_struk}>
                                    <td>{index + 1}</td>
                                    <td>{struk.pasien?.nama || "-"}</td>
                                    <td>
                                        {new Date(struk.periksa?.tanggal_periksa).toLocaleDateString()}
                                    </td>
                                    <td>
                                        Rp {struk.periksa?.biaya_periksa?.toLocaleString() ?? "-"}
                                    </td>
                                    <td>{struk.obat?.nama_obat || "-"}</td>
                                    <td>Rp {struk.obat?.harga?.toLocaleString() ?? "-"}</td>
                                    <td>
                                        <strong>Rp {struk.total_biaya?.toLocaleString()}</strong>
                                    </td>
                                    <td>
                                        <button
                                            className="button is-danger is-small"
                                            onClick={() => handleDeleteClick(struk.id_struk)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="has-text-centered has-text-grey">
                                    Tidak ada data riwayat pemeriksaan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal konfirmasi hapus */}
            {showModal && (
                <div className="modal is-active">
                    <div className="modal-background" onClick={cancelDelete}></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Konfirmasi Hapus</p>
                            <button
                                className="delete"
                                aria-label="close"
                                onClick={cancelDelete}
                            ></button>
                        </header>
                        <section className="modal-card-body">
                            Apakah Anda yakin ingin menghapus data ini?
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={confirmDelete}>
                                Hapus
                            </button>
                            <button className="button" onClick={cancelDelete}>
                                Batal
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default HistoryPasien;