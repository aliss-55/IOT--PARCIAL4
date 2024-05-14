CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    nodo INT(255)  NULL,
    rol VARCHAR(50) NOT NULL,
    PRIMARY KEY (id)
);
INSERT INTO users (username, password, nodo, rol) VALUES ('Camion1', 'Camion1', '1', 'usuario');
INSERT INTO users (username, password, nodo, rol) VALUES ('Camion2', 'Camion2', '2', 'usuario');
INSERT INTO users (username, password, nodo, rol) VALUES ('Admin', 'Admin', '', 'admin');
