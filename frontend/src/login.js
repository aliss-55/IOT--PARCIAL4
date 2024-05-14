import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = ({ setUserRole, setUserHome }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
    generic: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/auth/login", {
        username,
        password,
      });
      const home = response.data.nodo;
      console.log("Inicio de sesión exitoso:", response.data);
      setUserHome(home);
      setUserRole(response.data.rol);
      navigate("/home"); // Redirige al usuario a la página de inicio correspondiente
    } catch (error) {
      console.error("Error al iniciar sesión:", error.response?.data?.error || "Error desconocido");
      setError({
        ...error.response?.data?.errors, // Mapear errores de validación del servidor
        generic: error.response?.data?.error || "Error desconocido",
      });
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            border: '1px solid #ccc',
            borderRadius: '8px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
            En este sistema se monitorea la temperatura y la humedad en tiempo real para garantizar la seguridad alimentaria y la calidad de los productos durante su transporte, permitiendo visualizar el estado de estos en los camiones transportadores.
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={Boolean(error.username)}
              helperText={error.username}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(error.password)}
              helperText={error.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Iniciar Sesión
            </Button>
            {error.generic && (
              <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
                {error.generic}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;




