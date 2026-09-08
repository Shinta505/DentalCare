// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LoginUser from "./components/LoginUser";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import PasienList from "./components/PasienList";
import AddPasien from "./components/AddPasien";
import EditPasien from "./components/EditPasien";
import PeriksaPasien from "./components/PeriksaPasien";
import Dashboard from "./components/Dashboard";
import DokterList from "./components/DokterList";
import EditDokter from "./components/EditDokter.js"
import AddDokter from "./components/AddDokter.js";
import ObatList from "./components/ObatList";
import AddObat from "./components/AddObat.js";
import EditObat from "./components/EditObat.js";
import Struk from "./components/Struk"; 
import HistoryPasien from "./components/HistoryPasien";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginUser />} />
        <Route path="/register" element={<AddUser />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/pasien" element={<PasienList />} />
        <Route path="/pasien/add" element={<AddPasien />} />
        <Route path="/pasien/edit/:id" element={<EditPasien />} />
        <Route path="/pasien/periksa/:id" element={<PeriksaPasien />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor" element={<DokterList />} />
        <Route path="/edit-doctor/:id" element={<EditDokter />} />
        <Route path="/add-doctor" element={<AddDokter />} />
        <Route path="/obat" element={<ObatList />} />
        <Route path="/add-obat" element={<AddObat />} />
        <Route path="/obat/edit/:id" element={<EditObat />} />
        <Route path="/pasien/periksa/struk/:id_struk" element={<Struk />} />
        <Route path="/historypasien" element={<HistoryPasien />} /> 
        <Route path="*" element={<h1>404 - Halaman tidak ditemukan</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;