import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Dokter from "./DokterModel.js";

// Membuat tabel "pasien"
const Pasien = db.define("pasien", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nama: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tgl_lahir: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  no_telp: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  alamat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  id_dokter: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Dokter,
      key: "id_dokter",
    },
  },
}, {
  tableName: "pasien",
  freezeTableName: true,
  timestamps: false,
});

Pasien.belongsTo(Dokter, { foreignKey: "id_dokter" });

db.sync().then(() => console.log("Database synced"));

export default Pasien;