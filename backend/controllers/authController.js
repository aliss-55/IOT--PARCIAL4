const userModel = require("../models/UserModel");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar la contraseña (en este ejemplo, asumiendo que la contraseña está en texto plano)
    if (user.password !== password) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Inicio de sesión exitoso
    const userData = {
      id: user.id,
      username: user.username,
      nodo: user.nodo,
      rol: user.rol,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};