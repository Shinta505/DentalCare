import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET all users
async function getUsers(req, res) {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// GET user by ID
async function getUserById(req, res) {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// REGISTER (create user with hashed password)
async function createUser(req, res) {
 try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 5);
    await User.create({ username, password: hashPassword });
    res.status(201).json({ msg: "Register berhasil" });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ msg: "Username sudah digunakan" });
    }
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE user (optional password update)
async function updateUser(req, res) {
  try {
    const { username, password } = req.body;
    let updatedData = { username };

    if (password) {
      const encryptPassword = await bcrypt.hash(password, 5);
      updatedData.password = encryptPassword;
    }

    const result = await User.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });

    if (result[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: "User tidak ditemukan atau tidak ada data yang berubah",
        updatedData,
        result,
      });
    }

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
}

// DELETE user
async function deleteUser(req, res) {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

// LOGIN
export const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Simpan refresh token ke database
    await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });

    // Simpan juga di cookie (httpOnly)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // kalau pakai HTTPS jadi true
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ msg: "Token tidak ditemukan" });

    const user = await User.findOne({ where: { refresh_token: token } });
    if (!user) return res.status(403).json({ msg: "Refresh token tidak valid" });

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ msg: "Token tidak valid" });

      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// LOGOUT
async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user?.refresh_token) return res.sendStatus(204);

  await User.update({ refresh_token: null }, {
    where: {
      id: user.id,
    },
  });

  res.clearCookie("refreshToken");
  return res.sendStatus(200);
}

// Export all functions
export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  logout,
};
