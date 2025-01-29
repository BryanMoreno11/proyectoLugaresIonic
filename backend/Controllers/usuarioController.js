const pool = require("../database");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Función para generar un token JWT
function generateToken(user) {
    return jwt.sign({ id: user.usuario_codigo, tipo: user.tipo }, 'tu_secreto_jwt', { expiresIn: '1h' });
}

// Obtener un usuario por ID
async function getUsuario(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM usuario WHERE usuario_codigo=$1';
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'No existe el usuario con ese ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Obtener todos los usuarios
async function getUsuarios(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuario ORDER BY usuario_codigo');
        client.release();
        res.status(200).json(result.rows || []);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Registrar un nuevo usuario (verificando que el correo no exista)
async function createUsuario(req, res) {
    const { nombre, correo, contrasenia, imagen, tipo } = req.body;
    const queryCheck = 'SELECT * FROM usuario WHERE correo=$1';
    const queryInsert = 'INSERT INTO usuario (nombre, correo, contrasenia, imagen, tipo) VALUES ($1, $2, $3, $4, $5)';
    const valuesCheck = [correo];

    try {
        const client = await pool.connect();
        const checkResult = await client.query(queryCheck, valuesCheck);

        if (checkResult.rowCount > 0) {
            client.release();
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Hashear la contraseña antes de almacenarla
        const saltRounds = 10; // Número de rondas de hashing
        const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);

        const valuesInsert = [nombre, correo, hashedPassword, imagen, tipo];
        const insertResult = await client.query(queryInsert, valuesInsert);
        client.release();

        if (insertResult.rowCount > 0) {
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } else {
            res.status(400).json({ message: 'No se pudo registrar el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Actualizar un usuario
async function updateUsuario(req, res) {
    const { id } = req.params;
    const { nombre, correo, contrasenia, imagen, tipo } = req.body;

    // Verificar si el correo ya está en uso por otro usuario
    const queryCheck = 'SELECT * FROM usuario WHERE correo=$1 AND usuario_codigo!=$2';
    const valuesCheck = [correo, id];

    // Hashear la contraseña antes de almacenarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);

    // Query para actualizar el usuario
    const queryUpdate = 'UPDATE usuario SET nombre=$2, correo=$3, contrasenia=$4, imagen=$5, tipo=$6 WHERE usuario_codigo=$1';
    const valuesUpdate = [id, nombre, correo, hashedPassword, imagen, tipo];

    try {
        const client = await pool.connect();

        // Verificar si el correo ya está en uso
        const checkResult = await client.query(queryCheck, valuesCheck);
        if (checkResult.rowCount > 0) {
            client.release();
            return res.status(400).json({ message: 'El correo ya está registrado por otro usuario' });
        }

        // Si el correo no está en uso, proceder con la actualización
        const updateResult = await client.query(queryUpdate, valuesUpdate);
        client.release();

        if (updateResult.rowCount > 0) {
            res.status(200).json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar el usuario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}


// Eliminar un usuario por ID
async function deleteUsuario(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM usuario WHERE usuario_codigo=$1';
    const values = [id];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'No existe el usuario con ese ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Iniciar sesión
async function iniciarSesion(req, res) {
    const { correo, contrasenia } = req.body;
    const query = 'SELECT * FROM usuario WHERE correo=$1';
    const values = [correo];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        console.log("llamda correcta");

        if (result.rowCount > 0) {
            const user = result.rows[0];
            const validPassword = await bcrypt.compare(contrasenia, user.contrasenia);

            if (validPassword) {
                const token = generateToken(user);
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor",
          
         }

        );
    }
}


async function getUsuarioActual(req, res) {

    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    try {
        const decoded = jwt.verify(token, 'tu_secreto_jwt');
        const query = 'SELECT * FROM usuario WHERE usuario_codigo=$1';
        const values = [decoded.id];

        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}



module.exports = {
    getUsuario,
    getUsuarioActual,
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    iniciarSesion
};