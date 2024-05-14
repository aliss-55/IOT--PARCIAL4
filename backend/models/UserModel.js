const db = require("../db/db");

exports.getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length === 0) {
        return resolve(null); 
      }
      const user = results[0];
      resolve(user);
    });
  });
};

exports.createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const { username, password, nodo, rol } = userData;
    const query = "INSERT INTO users (username, password, nodo, rol) VALUES (?, ?, ?, ?)";
    db.query(query, [username, password, nodo, rol], (err, results) => {
      if (err) {
        return reject(err);
      }
      const newUser = {
        id: results.insertId,
        username,
        nodo,
        rol,
      };
      resolve(newUser);
    });
  });
};

exports.updateUser = (userId, userData) => {
  return new Promise((resolve, reject) => {
    const { username, password, nodo, rol } = userData;
    const query = "UPDATE users SET username = ?, password = ?, nodo = ?, rol = ? WHERE id = ?";
    db.query(query, [username, password, nodo, rol, userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.affectedRows === 0) {
        return resolve(null); // Usuario no encontrado
      }
      const updatedUser = {
        id: userId,
        username,
        nodo,
        rol,
      };
      resolve(updatedUser);
    });
  });
};

exports.deleteUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.affectedRows === 0) {
        return resolve(false); 
      }
      resolve(true); 
    });
  });
};

exports.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};
