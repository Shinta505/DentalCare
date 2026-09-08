import { where } from "sequelize";
import Periksa from "../models/PeriksaModel.js";
import Struk from "../models/StrukModel.js";
import Obat from "../models/ObatModel.js";
import Pasien from "../models/PasienModel.js";

export const getPeriksa = async (req, res) => {
    try {
        const response = await Periksa.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const getPeriksaById = async (req, res) => {
    try {
        const checkup = await Periksa.findOne({
            where: { id_periksa: req.params.id_periksa }
        });

        if (!checkup) {
            return res.status(404).json({ msg: "Checkup tidak ditemukan" });
        }

        res.status(200).json(checkup); // Menggunakan checkup bukannya doctor
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const createPeriksa = async (req, res) => {
    try {
      const { tanggal_periksa, biaya_periksa, pasienId, obatId } = req.body;

      const periksa = await Periksa.create({
        tanggal_periksa,
        biaya_periksa,
        pasienId,
        obatId,
      });

      const obat = await Obat.findByPk(obatId);
      const pasien = await Pasien.findByPk(pasienId);

      if (!obat || !pasien) {
        return res.status(404).json({ message: "Obat atau Pasien tidak ditemukan" });
      }

      const total_biaya = biaya_periksa + obat.harga;
  
      const struk = await Struk.create({
        id_pasien: pasienId,
        id_obat: obatId,
        id_periksa: periksa.id_periksa,
        total_biaya,
      });
  
      res.status(201).json({
        message: "Pemeriksaan berhasil ditambahkan dan struk berhasil dibuat",
        id_periksa: periksa.id_periksa,
        id_struk: struk.id_struk,
      });
    } catch (error) {
        console.log(error); // Log error secara lebih rinci
        res.status(500).json({ message: error.message });
    }
  };  

export const updatePeriksa = async (req, res) => {
    try {
        await Periksa.update(req.body, {
            where: {
                id_periksa: req.params.id_periksa
            }
        });
        res.status(200).json({ msg: "Pemeriksaan berhasil diperbarui" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

export const deletePeriksa = async (req, res) => {
    try {
        await Periksa.destroy({
            where: {
                id_periksa: req.params.id_periksa
            }
        });
        res.status(200).json({ msg: "Pemeriksaan berhasil dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Terjadi kesalahan server" });
    }
}

