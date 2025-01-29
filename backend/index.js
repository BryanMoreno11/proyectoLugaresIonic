const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

  app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ extended: false }));
//rutas
var  lugarRoutes = require('./Routes/lugarRoutes');
var  comentarioRoutes = require('./Routes/comentarioRoutes');
var  usuarioRoutes = require('./Routes/usuarioRoutes');
app.use('/api', lugarRoutes);
app.use('/api', comentarioRoutes);
app.use('/api', usuarioRoutes);


//Inicio del servidor

app.listen("3000", () => {
    console.log("Servidor iniciado en el puerto 3000");
});

