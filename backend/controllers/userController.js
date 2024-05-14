const UserModel = require("../models/UserModel");

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await UserModel.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    res.status(500).json({ error: "Error al crear un nuevo usuario" });
  }
};

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener todos los usuarios:", error);
    res.status(500).json({ error: "Error al obtener todos los usuarios" });
  }
};

// Actualizar información de un usuario existente
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const updatedUser = await UserModel.updateUser(userId, userData);
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar un usuario:", error);
    res.status(500).json({ error: "Error al actualizar un usuario" });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleted = await UserModel.deleteUserById(userId);
    if (!deleted) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar un usuario:", error);
    res.status(500).json({ error: "Error al eliminar un usuario" });
  }
};
