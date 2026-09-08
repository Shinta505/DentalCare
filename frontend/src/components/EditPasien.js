import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTooth, FaBirthdayCake, FaVenusMars, FaPhone, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";
import "animate.css";
import '../styles/main.css';
import { API } from "../utils";

const EditPasien = () => {
  const [nama, setNama] = useState("");
  const [tgl_lahir, setTgl_lahir] = useState("");
  const [gender, setGender] = useState("");
  const [no_telp, setTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [id_dokter, setIDDokter] = useState("");
  const [list_dokter, setListDokter] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [msg, setMsg] = useState("");


  useEffect(() => {
    getPasienById();
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
      console.log(res.data) // tambahkan ini
      setListDokter(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPasienById = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      const response = await API.get(`/pasien/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setNama(response.data.nama);
      setTgl_lahir(response.data.tgl_lahir);
      setGender(response.data.gender);
      setTelp(response.data.no_telp);
      setAlamat(response.data.alamat);
      setIDDokter(response.data.id_dokter);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePasien = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setMsg("Silakan login terlebih dahulu.");
        return;
      }
      await API.put(`/pasien/${id}`, {

        nama,
        tgl_lahir,
        gender,
        no_telp,
        alamat,
        id_dokter,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      navigate("/pasien");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <motion.div
        className="column is-half"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="box p-5 shadowed-box">
          <h1 className="title has-text-centered animate__animated animate__fadeInDown mb-5">
            <FaTooth style={{ marginRight: 8, color: '#4CAF50' }} />
            Edit Data Pasien
          </h1>
          <form onSubmit={updatePasien}>
            <div className="field">
              <label className="label">
                <FaUserMd style={{ marginRight: 6, color: '#3B82F6' }} />
                Nama
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input animated-input"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Pasien"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <FaBirthdayCake style={{ marginRight: 6, color: '#F59E0B' }} />
                Tanggal Lahir
              </label>
              <div className="control">
                <input
                  type="date"
                  className="input animated-input"
                  value={tgl_lahir}
                  onChange={(e) => setTgl_lahir(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <FaVenusMars style={{ marginRight: 6, color: '#EF4444' }} />
                Jenis Kelamin
              </label>
              <div className="control">
                <div className="select is-fullwidth animated-input">
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                <FaPhone style={{ marginRight: 6, color: '#10B981' }} />
                No. Telepon
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input animated-input"
                  value={no_telp}
                  onChange={(e) => setTelp(e.target.value)}
                  placeholder="Nomor Telepon"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">
                <FaMapMarkerAlt style={{ marginRight: 6, color: '#6366F1' }} />
                Alamat
              </label>
              <div className="control">
                <textarea
                  className="textarea animated-input"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat Pasien"
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="label">
                <FaUserMd style={{ marginRight: 6, color: '#8B5CF6' }} />
                Dokter
              </label>
              <div className="control">
                <div className="select is-fullwidth animated-input">
                  <select
                    value={id_dokter}
                    onChange={(e) => setIDDokter(e.target.value)}
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

            <div className="field has-text-centered mt-5">
              <button
                type="submit"
                className="button is-success is-fullwidth animate__animated animate__pulse animate__infinite"
                style={{ animationDuration: '2.5s' }}
              >
                Update Pasien
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditPasien;
