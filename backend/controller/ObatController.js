import { where } from "sequelize";
import Obat from "../models/ObatModel.js";

export const getObat = async (req, res) => {
    try {
        const response = await Obat.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const getObatById = async (req, res) => {
    try {
        const obat = await Obat.findOne({
            where: { id_obat: req.params.id_obat }
        });

        if (!obat) {
            return res.status(404).json({ msg: "Obat tidak ditemukan" });
        }

        res.status(200).json(obat);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const createObat = async (req, res) => {
    try {
        const inputResult = req.body;
        await Obat.create(inputResult);
        res.status(201).json({ msg: "Obat berhasil ditambahkan" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const updateObat = async (req, res) => {
    try {
        await Obat.update(req.body, {
            where: {
                id_obat: req.params.id_obat
            }
        });
        res.status(200).json({ msg: "Obat berhasil diperbarui" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const deleteObat = async (req, res) => {
    try {
        await Obat.destroy({
            where: {
                id_obat: req.params.id_obat
            }
        });
        res.status(200).json({ msg: "Obat berhasil dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}
