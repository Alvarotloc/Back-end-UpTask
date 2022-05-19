"use strict";
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/bbdd.js';
import usuarioRoutes from './routes/usuarioRoutes.js';

const servidor  = express();

servidor.use(express.json());

dotenv.config();

conectarDB();

//* Routing

servidor.use('/api/usuarios',usuarioRoutes);

const puerto = process.env.PORT || 4000;

servidor.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto 4000');
})