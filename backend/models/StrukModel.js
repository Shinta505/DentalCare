import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pasien from "./PasienModel.js";
import Obat from "./ObatModel.js";
import Periksa from "./PeriksaModel.js";

const { DataTypes } = Sequelize;

const Struk = db.define("Struk", {
  id_struk: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pasien: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Pasien",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  id_obat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Obat",
      key: "id_obat",
    },
    onDelete: "CASCADE",
  },
  id_periksa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Periksa",
      key: "id_periksa",
    },
    onDelete: "CASCADE",
  },
  total_biaya: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "Belum",
    allowNull: false
  },
}, {
  tableName: "struk",
  freezeTableName: true,
  timestamps: false
});

// Relasi antara Struk dan Pasien
Struk.belongsTo(Pasien, { foreignKey: "id_pasien", as: "pasien" });
// Relasi antara Struk dan Obat
Struk.belongsTo(Obat, { foreignKey: "id_obat", as: "obat" });
// Relasi antara Struk dan Periksa
Struk.belongsTo(Periksa, { foreignKey: "id_periksa", as: "periksa" });

export default Struk;