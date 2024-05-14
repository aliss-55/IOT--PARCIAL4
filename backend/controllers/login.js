const db = require("../db/db");

exports.login = (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Error al realizar la consulta:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Nombre de usuario o contraseña incorrectos" });
    }
    if (user.password !== password || user.username !== password) {
      return res.status(401).json({ error: "Nombre de usuario o contraseña incorrectos" });
    }
    res.json({ message: "Inicio de sesión exitoso", user });
  });
};
