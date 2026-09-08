import express from "express";


import {
  getPasien,
  getPasienById,
  createPasien,
  updatePasien,
  deletePasien,
} from "../controller/PasienController.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();
router.get('/token', refreshToken);
router.get("/pasien",verifyToken, getPasien);
router.get("/pasien/:id",verifyToken, getPasienById);
router.post("/add-pasien",verifyToken, createPasien);
router.put("/pasien/:id",verifyToken, updatePasien);
router.delete("/pasien/:id",verifyToken, deletePasien);

export default router;