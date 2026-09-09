# 📚 Backend API - Dental Care

> Dokumentasi resmi dan struktur direktori untuk layanan peladen (*backend server*) dari aplikasi **Dental Care**.

🔗 **Live Endpoint:** [https://be-dental-care.vercel.app](https://be-dental-care.vercel.app)

---

## 📖 About Project

Sistem **Backend Dental Care** adalah aplikasi berbasis Node.js dan Express.js yang dirancang untuk menyediakan layanan API (*Application Programming Interface*) bagi platform manajemen klinik gigi.

Backend ini bertanggung jawab penuh atas pemrosesan data klinik, termasuk manajemen data dokter, obat, pasien, proses pemeriksaan medis, pembuatan struk/pembayaran, serta sistem autentikasi dan otorisasi pengguna yang aman menggunakan *token-based authentication*.

Project ini dibangun dengan pendekatan modular untuk memastikan skalabilitas, kemudahan pemeliharaan, dan integrasi yang mulus dengan aplikasi sisi klien (*frontend*).

### 🎯 Tujuan Project

* Menyediakan RESTful API yang handal dan aman untuk sistem manajemen klinik gigi.
* Mengelola data master secara terstruktur (Dokter, Obat, dan Pasien).
* Menangani alur pelayanan medis (proses pemeriksaan dan pencatatan rekam medis).
* Menjamin keamanan akses data melalui autentikasi token (*Verify Token* & *Refresh Token*).
* Menyediakan fungsionalitas pencetakan struk pembayaran terintegrasi.

---

## ✨ Features

### 👨‍⚕️ Dokter Management

* Mengelola data informasi dokter yang bertugas di klinik.
* Operasi CRUD (Create, Read, Update, Delete) data dokter.

### 💊 Obat Management

* Mengelola inventaris obat yang tersedia di klinik.
* Pencatatan stok, nama obat, dan harga satuan.

### 🧑‍🤝‍🧑 Pasien Management

* Pendataan profil pasien yang berobat ke klinik gigi.
* Pencatatan riwayat identitas dan informasi kontak pasien.

### 🩺 Periksa (Medical Examination)

* Menangani proses pencatatan pemeriksaan pasien oleh dokter.
* Menghubungkan data pasien, dokter, tindakan, dan obat yang diberikan.

### 🧾 Struk (Billing & Receipt)

* Pembuatan dan pengelolaan data pembayaran atau struk medis.
* Rekapitulasi biaya layanan pemeriksaan dan obat.

### 👤 User & Authentication

* Registrasi dan manajemen pengguna sistem.
* Sistem autentikasi berbasis token (*Verify Token* & *Refresh Token*).
* Manajemen sesi login yang aman.

---

## 🛠️ Tech Stack

### Runtime & Framework

* Node.js
* Express.js

### Database & ORM

* MySQL / Database relasional
* Sequelize ORM

### Security & Utilities

* JSON Web Token (JWT) untuk autentikasi
* Bcrypt.js untuk enkripsi kata sandi
* CORS untuk pengaturan akses sumber daya lintas domain
* Dotenv untuk manajemen environment variables

### Deployment & Containerization

* Vercel (Serverless Deployment)
* Docker
* Google Cloud Build

---

## 📂 Project Structure

Struktur direktori utama dari folder `backend`:

```text
backend/
├── config/              # Konfigurasi database dan koneksi sistem
├── controller/          # Logika bisnis untuk setiap entitas (Dokter, Obat, Pasien, dll)
├── middleware/          # Lapisan pengecekan keamanan (misal: verifikasi token)
├── models/              # Definisi skema tabel database / ORM models
├── routes/              # Pengaturan endpoint jalur URL API
├── views/               # Berkas tampilan (template ejs untuk halaman root/fallback)
├── .env.example         # Contoh templat konfigurasi variabel lingkungan
├── cloudbuild.yaml      # Konfigurasi Google Cloud Build
├── dockerfile           # Konfigurasi kontainer Docker
├── index.js             # Berkas utama peladen (entry point)
├── package.json         # Daftar dependensi dan skrip npm
├── package-lock.json    # Versi terkunci dari dependensi npm
├── request.rest         # Berkas pengujian API (REST Client)
└── vercel.json          # Konfigurasi deployment untuk Vercel

```

---

## ⚙️ Installation & Local Development

Instruksi teknis untuk mempersiapkan lingkungan pengembangan secara lokal:

1. Lakukan kloning pada repositori utama ke dalam direktori lokal:
```bash
git clone https://github.com/.../DentalCare.git

```


2. Arahkan *command line* / *terminal* ke dalam direktori `backend`:
```bash
cd DentalCare/backend

```


3. Lakukan instalasi seluruh dependensi yang dibutuhkan menggunakan NPM:
```bash
npm install

```


4. Salin berkas `.env.example` menjadi `.env` dan sesuaikan konfigurasi kredensial database serta lingkungan Anda:
```bash
cp .env.example .env

```



---

## 🚀 Cara Menjalankan Sistem (How to Run)

Untuk menjalankan peladen pengembangan lokal (*local development server*), ikuti langkah berikut:

1. Jalankan aplikasi menggunakan Node.js secara langsung atau via skrip npm:
```bash
node index.js

```


*(Atau apabila dikonfigurasi menggunakan nodemon / npm start):*
```bash
npm start

```


2. Peladen akan berjalan secara lokal pada porta yang ditentukan (contoh: `http://localhost:5000`).
