const pool = require("../database");

// Obtener un lugar por ID
async function getLugar(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM lugar WHERE lugar_codigo=$1';
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'No existe el lugar con ese ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Obtener todos los lugares
async function getLugares(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM lugar ORDER BY lugar_codigo');
        client.release();
        res.status(200).json(result.rows || []);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor", err });
    }
}

// Crear un nuevo lugar
async function createLugar(req, res) {
    const { nombre, imagen } = req.body;
    const query = 'INSERT INTO lugar (nombre, imagen) VALUES ($1, $2)';
    const values = [nombre, imagen];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(201).json({ message: 'Lugar creado exitosamente' });
        } else {
            res.status(400).json({ message: 'No se pudo crear el lugar' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Actualizar un lugar
async function updateLugar(req, res) {
    const { id } = req.params;
    const { nombre, imagen } = req.body;
    const query = 'UPDATE lugar SET nombre=$2, imagen=$3 WHERE lugar_codigo=$1';
    const values = [id, nombre, imagen];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Lugar actualizado correctamente' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar el lugar' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Eliminar un lugar por ID
async function deleteLugar(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM lugar WHERE lugar_codigo=$1';
    const values = [id];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Lugar eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'No existe el lugar con ese ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    getLugar,
    getLugares,
    createLugar,
    updateLugar,
    deleteLugar
};