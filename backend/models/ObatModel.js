import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Obat = db.define("obat", {
  id_obat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nama_obat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  definisi: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  efek_samping: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "obat",
  freezeTableName: true,
  timestamps: false
});

export default Obat;
(async () => {
  await db.sync();
})();
