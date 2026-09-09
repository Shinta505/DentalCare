# 📚 DentalCare (Frontend)

> Platform manajemen dan layanan kesehatan gigi berbasis web yang dirancang untuk membantu pasien dalam melakukan reservasi dokter, melihat rekam medis, serta mengelola administrasi klinik secara interaktif dan terstruktur.

🔗 **Live Website:** [https://dental-care-five-mocha.vercel.app](https://dental-care-five-mocha.vercel.app)

🔗 **Live Backend API:** [https://be-dental-care.vercel.app](https://be-dental-care.vercel.app)

---

## 📖 About Project

**DentalCare** adalah platform sistem informasi klinik gigi yang berfokus pada kemudahan akses layanan kesehatan gigi bagi pasien serta efisiensi operasional bagi tenaga medis dan administrator klinik.

Platform ini membantu pasien dalam mengatur jadwal pemeriksaan, melihat daftar dokter spesialis, memantau rekam medis pemeriksaan, hingga memproses pembayaran atau melihat struk tindakan medis secara digital.

Project ini dikembangkan sebagai **full-stack web application** dengan pemisahan arsitektur *frontend* dan *backend*, serta terintegrasi dengan database relasional serta sistem autentikasi berbasis token.

### 🎯 Tujuan Project

* Memudahkan pasien dalam melakukan pendaftaran dan penjadwalan pemeriksaan gigi secara online.
* Menyediakan informasi profil dokter dan ketersediaan jadwal praktik yang transparan.
* Mendigitalisasi pencatatan rekam medis pemeriksaan dan resep obat pasien.
* Menyediakan manajemen data obat, resep, dan transaksi keuangan klinik yang terpusat.
* Meningkatkan efisiensi pelayanan administrasi klinik secara keseluruhan.

---

## ✨ Features

### 👨‍⚕️ Manajemen Dokter

* Menampilkan daftar lengkap dokter gigi yang bertugas di klinik.
* Informasi detail mengenai spesialisasi dan jadwal praktik dokter.
* Pencarian dan filter data dokter untuk memudahkan pasien.

### 💊 Manajemen Obat

* Pengelolaan data inventaris obat klinik.
* Informasi ketersediaan stok obat, jenis, dan harga satuan.
* Integrasi data obat ke dalam resep pemeriksaan pasien.

### 🧑‍🤝‍🧑 Manajemen Pasien

* Pendataan profil pasien yang terintegrasi dengan sistem klinik.
* Riwayat pendaftaran dan informasi personal pasien.
* Manajemen akses data pasien oleh administrator.

### 🩺 Pemeriksaan & Rekam Medis (Periksa)

* Pencatatan proses pemeriksaan pasien oleh dokter.
* Input diagnosa, keluhan, dan tindakan medis yang diberikan.
* Pengelolaan resep obat yang harus diambil pasien setelah pemeriksaan.

### 🧾 Struk & Pembayaran

* Pembuatan struk pembayaran otomatis berdasarkan tindakan dan obat yang diberikan.
* Rekapitulasi rincian biaya pemeriksaan pasien.
* Riwayat transaksi keuangan klinik.

### 👤 Authentication & Authorization

* Registrasi dan login akun pengguna (Pasien, Dokter, Admin).
* Session management menggunakan token keamanan (*JWT & Refresh Token*).
* Pembatasan hak akses halaman berdasarkan peran pengguna (*role-based access control*).

---

## 🛠️ Tech Stack

### Frontend

* React JS
* CSS3
* JavaScript JSX dan HTML

### Backend

* Node.js
* Express.js
* Sequelize (ORM)

### Database

* PostgreSQL

### Deployment & Tools

* Vercel
* GitHub

---

## ⚙️ Installation

Berikut adalah instruksi teknis untuk mempersiapkan lingkungan pengembangan frontend secara lokal:

1. Lakukan kloning pada repositori frontend ini ke dalam direktori lokal:
```bash
git clone https://github.com/username/dental-care-frontend.git

```


2. Arahkan *command line* / *terminal* ke dalam direktori proyek:
```bash
cd dental-care-frontend

```


3. Lakukan instalasi seluruh dependensi yang dibutuhkan oleh sistem menggunakan NPM:
```bash
npm install

```



## Cara Menjalankan Sistem (How to Run)

Untuk menjalankan peladen (*server*) pengembangan lokal frontend, ikuti langkah berikut:

1. Jalankan mode pengembangan lokal:
```bash
npm run start

```


*(Atau sesuaikan dengan skrip start pada berkas `package.json` proyek)*
2. Buka peramban web (*web browser*) dan akses alamat lokal yang tertera pada terminal (biasanya `http://localhost:3000`).
