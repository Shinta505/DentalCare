import express from "express";
import {
    getPeriksa,
    getPeriksaById,
    createPeriksa,
    updatePeriksa,
    deletePeriksa,
} from "../controller/PeriksaController.js";
import { refreshToken } from "../controller/RefreshToken.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get('/token', refreshToken);

router.get("/periksa",verifyToken, getPeriksa); 
router.get("/periksa/:id_periksa",verifyToken, getPeriksaById);  
router.post("/add-periksa", createPeriksa);               
router.put("/periksa/:id_periksa",verifyToken, updatePeriksa);
router.delete("/periksa/:id_periksa", deletePeriksa);   

export default router;