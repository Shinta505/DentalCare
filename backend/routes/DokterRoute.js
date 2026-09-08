import express from "express";
import {
    getDokter,
    getDokterById,
    createDokter,
    updateDokter,
    deleteDokter,
    
} from "../controller/DokterController.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get('/token', refreshToken);
router.get("/doctor",verifyToken, getDokter);
router.get("/dokter/:id_dokter",verifyToken, getDokterById);
router.post("/add-doctor",verifyToken, createDokter);
router.put("/dokter/:id_dokter",verifyToken, updateDokter);
router.delete("/dokter/:id_dokter",verifyToken, deleteDokter);
export default router;