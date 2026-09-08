import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Dokter = db.define('dokter', {
    id_dokter: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_dokter: {
        type: DataTypes.STRING,
        allowNull: false
    },
    spesialis: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'dokter',
    freezeTableName: true,
    timestamps: false
});

export default Dokter;
(async ()=> {
    await db.sync();
})();