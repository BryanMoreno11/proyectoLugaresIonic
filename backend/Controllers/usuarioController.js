const pool = require("../database");

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
    const valuesInsert = [nombre, correo, contrasenia, imagen, tipo];

    try {
        const client = await pool.connect();
        const checkResult = await client.query(queryCheck, valuesCheck);

        if (checkResult.rowCount > 0) {
            client.release();
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

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

    // Query para actualizar el usuario
    const queryUpdate = 'UPDATE usuario SET nombre=$2, correo=$3, contrasenia=$4, imagen=$5, tipo=$6 WHERE usuario_codigo=$1';
    const valuesUpdate = [id, nombre, correo, contrasenia, imagen, tipo];

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
    const query = 'SELECT * FROM usuario WHERE correo=$1 AND contrasenia=$2';
    const values = [correo, contrasenia];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Credenciales incorrectas' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    getUsuario,
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    iniciarSesion
};