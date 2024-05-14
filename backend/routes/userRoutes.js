const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Rutas para la gestión de usuarios
router.post("/users", UserController.createUser); // Crear un nuevo usuario
router.get("/users", UserController.getAllUsers); // Obtener todos los usuarios
router.put("/users/:id", UserController.updateUser); // Actualizar información de un usuario
router.delete("/users/:id", UserController.deleteUser); // Eliminar un usuario

module.exports = router;
