const express = require("express");
const cors = require("cors");
const app = express();
const port = 5050;

// Middleware para procesar datos JSON y permitir CORS
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.send("¡Servidor en línea!");
});

app.use((req, res) => {
  res.status(404).send("Ruta no encontrada");
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});


