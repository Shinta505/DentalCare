import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import "animate.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate("/");
        }
    }, [navigate]);

    const mainSections = [
        {
            title: "Profil",
            text: "\u201cDental Care\u201d merujuk pada perawatan gigi yang profesional dan penuh perhatian. \u201cShinta\u201d melambangkan sentuhan pribadi yang ramah dan dapat dipercaya dalam setiap layanan kami. Jadi, 'Dental Care Shinta' adalah klinik gigi yang berkomitmen untuk memberikan perawatan terbaik demi kesehatan dan keindahan senyum Anda."
        },
        {
            title: "Tentang",
            text: "Selamat datang di Klinik Gigi Dental Care Shinta, tempat di mana kami berkomitmen untuk memberikan perawatan terbaik untuk kesehatan gigi dan mulut Anda. Sebagai klinik gigi terpercaya, kami memahami bahwa setiap pasien memiliki kebutuhan perawatan yang unik dan berhak mendapatkan pengalaman yang nyaman."
        },
        {
            title: "Visi & Misi",
            text: "Menjadi klinik gigi pilihan utama yang menyediakan solusi kesehatan gigi komprehensif untuk mewujudkan senyum sehat dan percaya diri bagi setiap individu dan masyarakat."
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/");
    };

    return (
        <div className="container is-fluid has-background-light pb-6 animate__animated animate__fadeIn">
            {/* Navbar */}
            <header className="navbar is-white is-fixed-top px-5">
                <div className="navbar-brand">
                    <a className="navbar-item" href="#">
                        <img src="/logo-rsj.png" alt="Logo Dental Care" style={{ height: "80px" }} />
                        <span className="ml-2 has-text-weight-bold has-text-link">Dental Care Shinta</span>
                    </a>
                </div>
                <div className="navbar-end">
                    {["Dokter", "Obat", "Pasien", "History Pasien"].map((item) => (
                        <a
                            key={item}
                            onClick={() => {
                                const path = item === "Dokter" ? "/doctor" : `/${item.toLowerCase().replace(" ", "")}`;
                                navigate(path);
                            }}
                            className="navbar-item is-size-6 has-text-grey-dark"
                            style={{ cursor: "pointer" }}
                        >
                            {item}
                        </a>
                    ))}
                    <a
                        className="navbar-item is-size-6 has-text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowLogoutModal(true)}
                    >
                        Logout
                    </a>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className="hero is-medium is-link is-bold mt-6 animate__animated animate__fadeInDown"
                style={{
                    backgroundImage: 'url("/bg-dashboard.png")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    color: "white",
                    padding: "0 2rem"
                }}
            >
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                        backgroundColor: "rgba(0,0,0,0.6)",
                        color: "white",
                        padding: "2rem",
                        borderRadius: "10px",
                        maxWidth: "550px",
                        position: "absolute",
                        left: "2rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        textAlign: "left"
                    }}
                >
                    <h1 className="title is-3">Selamat Datang</h1>
                    <p className="subtitle is-5 mt-3">
                        Di Dental Care Shinta, kami berkomitmen memberikan pelayanan terbaik untuk kesehatan gigi dan mulut Anda secara tulus dan profesional.
                    </p>
                </motion.div>
            </section>

            {/* Kontak Kami */}
            <section className="section py-5">
                <div className="box animate__animated animate__fadeInUp">
                    <h2 className="title is-5 has-text-link">Kontak Kami</h2>
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-full-mobile is-flex is-align-items-center">
                            <PhoneIcon style={{ height: "1.5em", width: "1.5em", color: "#00d1b2" }} />
                            <span className="ml-2 is-size-6">021-1234567</span>
                        </div>
                        <div className="column is-full-mobile is-flex is-align-items-center">
                            <MapPinIcon style={{ height: "1.5em", width: "1.5em", color: "#00d1b2" }} />
                            <span className="ml-2 is-size-6">Jalan Kaliurang KM. 17, Pakem, Sleman, Daerah Istimewa Yogyakarta</span>
                        </div>
                        <div className="column is-full-mobile is-flex is-align-items-center">
                            <EnvelopeIcon style={{ height: "1.5em", width: "1.5em", color: "#00d1b2" }} />
                            <span className="ml-2 is-size-6">contact@dentalcareshinta.com</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Section */}
            <section className="section">
                <div className="columns is-multiline">
                    {mainSections.map(({ title, text }, index) => (
                        <motion.div
                            className="column is-one-third"
                            key={title}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="box has-background-white-ter">
                                <h2 className="title is-5 has-text-link">{title}</h2>
                                <p className="is-size-6">{text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lokasi Kami */}
            <section className="section">
                <h2 className="title is-5 has-text-link">Lokasi Kami</h2>
                <motion.div
                    className="box"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d15816.50510452743!2d110.418103!3d-7.669571!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwNDAnMTAuNSJTIDExMMKwMjUnMDUuMiJF!5e0!3m2!1sen!2sus!4v1745442777844!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="map"
                    ></iframe>
                </motion.div>
            </section>

            {/* Modal Logout */}
            {showLogoutModal && (
                <div className="modal is-active animate__animated animate__fadeIn">
                    <div className="modal-background" onClick={() => setShowLogoutModal(false)}></div>
                    <div className="modal-content box">
                        <p className="is-size-5 mb-3">Apakah Anda ingin logout?</p>
                        <div className="buttons is-right">
                            <button className="button" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                            <button className="button is-danger" onClick={handleLogout}>Ya</button>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={() => setShowLogoutModal(false)}></button>
                </div>
            )}
        </div>
    );
}