import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../utils";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTooth,
  faUserPlus,
  faCalendar,
  faVenusMars,
  faPhone,
  faMapMarkedAlt,
  faUserDoctor,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/main.css"; // Pastikan file ini ada di folder styles

const AddPasien = () => {
  const [nama, setNama] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [gender, setGender] = useState("");
  const [no_telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [id_dokter, setIDDokter] = useState("");
  const [list_dokter, setListDokter] = useState([]);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [telpError, setTelpError] = useState("");

  useEffect(() => {
    fetchDokter();
  }, []);

  const fetchDokter = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const res = await API.get("/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setListDokter(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const validatePhone = (phone) => {
    // Contoh validasi nomor telepon Indonesia: mulai dengan 08, panjang 10-13 digit
    const phoneRegex = /^08\d{8,11}$/;
    return phoneRegex.test(phone);
  };

  const savePasien = async (e) => {
    e.preventDefault();

    // Reset pesan error telepon
    setTelpError("");
    setMsg("");

    if (!validatePhone(no_telp)) {
      setTelpError("Nomor telepon tidak valid. Harus dimulai dengan '08' dan terdiri dari 10-13 digit.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      await API.post(
        "/add-pasien",
        {
          nama,
          tgl_lahir,
          gender,
          no_telp,
          alamat,
          id_dokter: parseInt(id_dokter),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      navigate("/pasien");
    } catch (error) {
      console.error("Error saving patient data:", error);
      setMsg("Gagal menyimpan data pasien. Silakan coba lagi.");
    }
  };

  return (
    <motion.div
      className="add-pasien-container animate__animated animate__fadeIn"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="box p-5 custom-box">
        <h1 className="title has-text-centered mb-5">
          <FontAwesomeIcon icon={faTooth} className="mr-2 has-text-info" /> Tambah Data Pasien
        </h1>

        {msg && <p className="has-text-danger has-text-centered">{msg}</p>}

        <form onSubmit={savePasien}>
          <div className="field">
            <label className="label">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" /> Nama
            </label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Pasien"
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              <FontAwesomeIcon icon={faCalendar} className="mr-2" /> Tanggal Lahir
            </label>
            <div className="control">
              <input
                type="date"
                className="input"
                value={tgl_lahir}
                onChange={(e) => setTgl_lahir(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <label className="label">
              <FontAwesomeIcon icon={faVenusMars} className="mr-2" /> Jenis Kelamin
            </label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="label">
              <FontAwesomeIcon icon={faPhone} className="mr-2" /> No. Telepon
            </label>
            <div className="control">
              <input
                type="text"
                className={`input ${telpError ? "is-danger" : ""}`}
                value={no_telp}
                onChange={(e) => setTelp(e.target.value)}
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>
            {telpError && <p className="help is-danger">{telpError}</p>}
          </div>

          <div className="field">
            <label className="label">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" /> Alamat
            </label>
            <div className="control">
              <textarea
                className="textarea"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat lengkap"
                required
              ></textarea>
            </div>
          </div>

          <div className="field">
            <label className="label">
              <FontAwesomeIcon icon={faUserDoctor} className="mr-2" /> Dokter
            </label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={id_dokter}
                  onChange={(e) => setIDDokter(e.target.value)}
                  required
                >
                  <option value="">Pilih Dokter</option>
                  {list_dokter.map((dokter) => (
                    <option key={dokter.id_dokter} value={dokter.id_dokter}>
                      {dokter.nama_dokter} - {dokter.spesialis}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <motion.div
            className="field has-text-centered mt-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button type="submit" className="button is-info is-fullwidth">
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Simpan Data Pasien
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddPasien;