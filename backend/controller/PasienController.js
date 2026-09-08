import { where } from "sequelize";
import Pasien from "../models/PasienModel.js";
import Dokter from "../models/DokterModel.js";

export const getPasien = async (req, res) => {
  try {
    const response = await Pasien.findAll({
      include: [
        {
          model: Dokter,
          attributes: ['nama_dokter']
        }
      ]
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPasienById = async (req, res) => {
  try {
    const response = await Pasien.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Dokter,
        attributes: ["nama_dokter"],
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPasien = async (req, res) => {
  try {
    const {
      nama,
      tgl_lahir,
      gender,
      no_telp,
      alamat,
      id_dokter,
    } = req.body;

    // Ambil data dokter
    const dokter = await Dokter.findOne({ where: { id_dokter } });
    if (!dokter) {
      return res.status(404).json({ msg: "Dokter tidak ditemukan" });
    }

    // Buat pasien dengan nama_dokter ikut disimpan
    await Pasien.create({
      nama,
      tgl_lahir,
      gender,
      no_telp,
      alamat,
      id_dokter,
    });

    res.status(201).json({ msg: "Pasien Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePasien = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nama,
      tgl_lahir,
      gender,
      no_telp,
      alamat,
      id_dokter,
    } = req.body;

    // Ambil data dokter
    const dokter = await Dokter.findOne({ where: { id_dokter } });
    if (!dokter) {
      return res.status(404).json({ msg: "Dokter tidak ditemukan" });
    }

    await Pasien.update(
      {
        nama,
        tgl_lahir,
        gender,
        no_telp,
        alamat,
        id_dokter,
      },
      { where: { id } }
    );

    res.status(200).json({ msg: "Pasien Updated" });
  } catch (error) {
    console.log(error.message);
  }
};


export const deletePasien = async (req, res) => {
  try {
    await Pasien.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Pasien Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
