import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refresh_token: {
    type: DataTypes.STRING, // Bisa string panjang
    allowNull: true,
  }
});

export default User;