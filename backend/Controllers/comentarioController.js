const pool = require("../database");

// Obtener un comentario por ID
async function getComentario(req, res) {
    const { id } = req.params;
    const query = 'SELECT * FROM comentario WHERE comentario_codigo=$1';
    const values = [id];
    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'No existe el comentario con ese ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Obtener todos los comentarios de un lugar
async function getComentariosPorLugar(req, res) {
    const { lugarId } = req.params;

    // Query con JOIN para obtener los comentarios y los datos del usuario
    const query = `
        SELECT 
            c.comentario_codigo,
            c.lugar_codigo,
            c.usuario_codigo,
            c.comentario,
            c.fecha_creacion,
            u.nombre AS usuario_nombre,
            u.imagen AS usuario_imagen
        FROM comentario c
        JOIN usuario u ON c.usuario_codigo = u.usuario_codigo
        WHERE c.lugar_codigo = $1
        ORDER BY c.fecha_creacion DESC
    `;
    const values = [lugarId];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        // Devuelve los comentarios con los datos del usuario
        res.status(200).json(result.rows || []);
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Crear un nuevo comentario
async function createComentario(req, res) {
    const { lugar_codigo, usuario_codigo, comentario } = req.body;
    const query = 'INSERT INTO comentario (lugar_codigo, usuario_codigo, comentario) VALUES ($1, $2, $3)';
    const values = [lugar_codigo, usuario_codigo, comentario];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(201).json({ message: 'Comentario creado exitosamente' });
        } else {
            res.status(400).json({ message: 'No se pudo crear el comentario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Actualizar un comentario
async function updateComentario(req, res) {
    const { id } = req.params;
    const { comentario } = req.body;
    const query = 'UPDATE comentario SET comentario=$2 WHERE comentario_codigo=$1';
    const values = [id, comentario];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Comentario actualizado correctamente' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar el comentario' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

// Eliminar un comentario por ID
async function deleteComentario(req, res) {
    const { id } = req.params;
    const query = 'DELETE FROM comentario WHERE comentario_codigo=$1';
    const values = [id];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();

        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Comentario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'No existe el comentario con ese ID' });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}

module.exports = {
    getComentario,
    getComentariosPorLugar,
    createComentario,
    updateComentario,
    deleteComentario
};