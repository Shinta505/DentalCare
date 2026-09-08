import express from "express";
import {
    getObat,
    getObatById,
    createObat,
    updateObat,
    deleteObat
} from "../controller/ObatController.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get('/token', refreshToken);
router.get("/obat",verifyToken, getObat);
router.get("/obat/:id_obat",verifyToken, getObatById);
router.post("/add-obat",verifyToken, createObat);
router.put("/obat/:id_obat",verifyToken, updateObat);
router.delete("/obat/:id_obat", deleteObat);

export default router;
