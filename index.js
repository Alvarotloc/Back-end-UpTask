"use strict";
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/bbdd.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectosRoutes from './routes/proyectosRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';
import cors from 'cors';

const servidor  = express();

servidor.use(express.json()); //* Este es el sustituto de body-parser, que está deprecated

dotenv.config();

conectarDB();

//* Configurar CORS

const whiteList = [process.env.FRONTEND_URL];

const corsOptions = {
    origin : function(origin,callback){
        if(whiteList.includes(origin)){
            callback(null,true);
        } else {
            callback(new Error('Error de Cors'))
        }
    }
}

//* Routing

servidor.use(cors(corsOptions))

servidor.use('/api/usuarios',usuarioRoutes);
servidor.use('/api/proyectos',proyectosRoutes);
servidor.use('/api/tareas',tareasRoutes);

const puerto = process.env.PORT || 4000;

servidor.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto 4000');
})