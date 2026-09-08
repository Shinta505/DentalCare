import express from "express";
import {
    getAllStruk,
    getStrukById,
    createStruk,
    updateStruk,
    deleteStruk,
    getSelesaiStruks,
  } from "../controller/StrukController.js";  
import { refreshToken } from "../controller/RefreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get('/token', refreshToken);

router.get("/struk",verifyToken, getAllStruk); 
router.get("/pasien/periksa/struk/:id_struk",verifyToken, getStrukById);
router.post("/struk", createStruk);
router.put("/struk/:id",verifyToken, updateStruk);
router.delete("/struk/:id", deleteStruk);
router.get("/struk/selesai",verifyToken, getSelesaiStruks);

export default router;