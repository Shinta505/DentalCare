import { where } from "sequelize";
import Dokter from "../models/DokterModel.js";

export const getDokter = async (req, res) => {
    try {
        const response = await Dokter.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}
export const getDokterById = async (req, res) => {
    try {
        const doctor = await Dokter.findOne({
            where: { id_dokter: req.params.id_dokter }
        });

        if (!doctor) {
            return res.status(404).json({ msg: "Dokter tidak ditemukan" });
        }

        res.status(200).json(doctor);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}
export const createDokter = async (req, res) => {
    try {
        const inputResult = req.body;
        await Dokter.create(inputResult);
        res.status(201).json({ msg: "Doctor created" });
    } catch (error) {
        console.log(error.message);
    }
}
export const updateDokter = async (req, res) => {
    try {
        await Dokter.update(req.body, {
            where: {
                id_dokter: req.params.id_dokter
            }
        });
        res.status(200).json({ msg: "This Doctor Updated" });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteDokter = async (req, res) => {
    try {
        await Dokter.destroy({
            where: {
                id_dokter: req.params.id_dokter
            }
        });
        res.status(200).json({ msg: "This Doctor Completed Detele" });
    } catch (error) {
        console.log(error.message);
    }
}