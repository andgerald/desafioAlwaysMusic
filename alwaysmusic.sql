-- Crear la base de datos empresa
CREATE DATABASE alwaysmusic;

-- Conectar a la base de datos empresa
\c users;

-- Crear la tabla usuarios
CREATE TABLE users (
    nombre VARCHAR(30) NOT NULL,
    rut VARCHAR(30) NOT NULL,
    curso VARCHAR(30) NOT NULL,
    nivel VARCHAR(30) NOT NULL
);

INSERT INTO users (nombre,rut,curso,nivel) VALUES ('geraldine', '18795772', 'trompeta','2');
INSERT INTO users (nombre,rut,curso,nivel) VALUES ('Brian May', '12.345.768-9', 'guitarra','7');
