import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import PasienRoute from "./routes/PasienRoute.js";
import DokterRoute from "./routes/DokterRoute.js";
import PeriksaRoute from "./routes/PeriksaRoute.js";
import ObatRoute from "./routes/ObatRoute.js"
import StrukRoute from "./routes/StrukRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import sequelize from "./config/Database.js";

dotenv.config();
const app = express();

app.use(cookieParser());

// 1. Sesuaikan CORS agar mengizinkan akses dari domain Vercel nantinya
app.use(cors({ 
  credentials: true,
  // Mengizinkan localhost ATAU URL frontend produksi dari Environment Variable Vercel
  origin: ['http://localhost:3000', process.env.FRONTEND_URL], 
  methods: ["GET", "POST", "PUT", "DELETE"], 
}));

app.use(express.json());
app.use(UserRoute);
app.use(PasienRoute);
app.use(DokterRoute);
app.use(PeriksaRoute);
app.use(ObatRoute);
app.use(StrukRoute);

// 2. Hubungkan ke database tanpa memblokir proses eksekusi Vercel
sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
    return sequelize.sync(); // sinkronisasi model
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

// 3. Jalankan app.listen() HANYA jika dieksekusi di laptop (bukan Vercel)
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));
}

// 4. Baris WAJIB agar Vercel bisa membaca dan menjalankan routing API-mu
export default app;
