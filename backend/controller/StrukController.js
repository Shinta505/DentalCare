import Struk from "../models/StrukModel.js";
import Pasien from "../models/PasienModel.js";
import Obat from "../models/ObatModel.js";
import Periksa from "../models/PeriksaModel.js";

// Get all Struks
export const getAllStruk = async (req, res) => {
  try {
    const struk = await Struk.findAll({
      include: [
        {
          model: Pasien,
          as: "pasien",
          attributes: ["nama"],
        },
        {
          model: Obat,
          attributes: ["nama_obat", "harga"],
        },
        {
          model: Periksa,
          attributes: ["tanggal_periksa", "biaya_periksa"],
        },
      ],
    });
    res.status(200).json(struk);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Struks: " + error.message });
  }
};

// Get Struk by ID
export const getStrukById = async (req, res) => {
  const { id_struk } = req.params;

  if (!id_struk) {
    return res.status(400).json({ message: "Struk ID is required" });
  }

  try {
    const struk = await Struk.findByPk(id_struk, {
      include: [
        {
          model: Pasien,
          as: "pasien",
          attributes: ["nama"],

        },
        {
          model: Obat,
          as: "obat",
          attributes: ["nama_obat", "harga"],
        },
        {
          model: Periksa,
          as: "periksa",
          attributes: ["tanggal_periksa", "biaya_periksa"],
        },
      ],
    });

    if (!struk) {
      return res.status(404).json({ message: "Struk not found" });
    }

    res.status(200).json(struk);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Struk: " + error.message });
  }
};

// Create a new Struk
export const createStruk = async (req, res) => {
  try {
    // Mengambil data yang dikirim dari frontend
    const { id_periksa, id_pasien, id_obat } = req.body;

    // Validasi input
    if (!id_periksa || !id_pasien || !id_obat) {
      return res.status(400).json({ message: "Semua ID wajib diisi" });
    }

    // Mengambil data dari tabel terkait berdasarkan ID
    const periksa = await Periksa.findByPk(id_periksa);
    const pasien = await Pasien.findByPk(id_pasien);
    const obat = await Obat.findByPk(id_obat);

    // Validasi jika data tidak ditemukan
    if (!periksa || !pasien || !obat) {
      return res.status(404).json({ message: "Data pasien/periksa/obat tidak ditemukan" });
    }

    // Menampilkan data yang diambil untuk pengecekan
    console.log("Data Periksa:", periksa);
    console.log("Data Pasien:", pasien);
    console.log("Data Obat:", obat);

    // Mengonversi biaya periksa dan harga obat menjadi angka (float)
    const biayaPeriksa = parseFloat(periksa.biaya_periksa);
    const hargaObat = parseFloat(obat.harga);

    // Memastikan bahwa nilai-nilai tersebut valid
    if (isNaN(biayaPeriksa) || isNaN(hargaObat)) {
      return res.status(400).json({ message: "Biaya periksa atau harga obat tidak valid" });
    }

    // Menghitung total biaya
    const totalBiaya = biayaPeriksa + hargaObat;

    // Menampilkan hasil perhitungan untuk pengecekan
    console.log("Total Biaya:", totalBiaya);

    // Membuat data struk baru
    const struk = await Struk.create({
      id_pasien,
      id_obat,
      id_periksa,
      total_biaya: totalBiaya,  // Menyimpan total biaya yang telah dihitung
    });

    // Mengirimkan respons sukses ke frontend
    res.status(201).json({
      message: "Struk berhasil dibuat",
      struk,
    });

  } catch (error) {
    // Menangani error jika ada kesalahan
    console.error("Error creating struk:", error);
    res.status(500).json({ message: "Terjadi kesalahan dalam pembuatan struk." });
  }
};

// Update Struk by ID
export const updateStruk = async (req, res) => {
  const { id } = req.params;
  const { id_pasien, id_obat, id_periksa, total_biaya, status } = req.body;

  if (!id_pasien && !id_obat && !id_periksa && !total_biaya && !status) {
    return res.status(400).json({ message: "At least one field must be provided to update" });
  }

  try {
    const struk = await Struk.findByPk(id);
    if (!struk) {
      return res.status(404).json({ message: "Struk not found" });
    }

    struk.id_pasien = id_pasien || struk.id_pasien;
    struk.id_obat = id_obat || struk.id_obat;
    struk.id_periksa = id_periksa || struk.id_periksa;
    struk.total_biaya = total_biaya || struk.total_biaya;
    struk.status = status || struk.status;

    await struk.save();
    res.status(200).json(struk);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Struk: " + error.message });
  }
};


// Delete Struk by ID
export const deleteStruk = async (req, res) => {
  const { id } = req.params;

  try {
    const struk = await Struk.findByPk(id);
    if (!struk) {
      return res.status(404).json({ message: "Struk not found" });
    }

    await struk.destroy();
    res.status(200).json({ message: "Struk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Struk: " + error.message });
  }
};

// Get all Struk with status "Selesai"
export const getSelesaiStruks = async (req, res) => {
  try {
    const selesaiStruks = await Struk.findAll({
      where: { status: "Selesai" },
      include: [
        {
          model: Pasien,
          as: "pasien",
          attributes: ["nama"],
        },
        {
          model: Obat,
          as: "obat",
          attributes: ["nama_obat", "harga"],
        },
        {
          model: Periksa,
          as: "periksa",
          attributes: ["tanggal_periksa", "biaya_periksa"],
        },
      ],
    });
    res.status(200).json(selesaiStruks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch completed Struks: " + error.message });
  }
};
