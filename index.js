"use strict";
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/bbdd.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectosRoutes from './routes/proyectosRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';

const servidor  = express();

servidor.use(express.json()); //* Este es el sustituto de body-parser, que está deprecated

dotenv.config();

conectarDB();

//* Routing

servidor.use('/api/usuarios',usuarioRoutes);
servidor.use('/api/proyectos',proyectosRoutes);
servidor.use('/api/tareas',tareasRoutes);

const puerto = process.env.PORT || 4000;

servidor.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto 4000');
})