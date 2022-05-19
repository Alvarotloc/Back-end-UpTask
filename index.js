"use strict";
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/bbdd.js';

const servidor  = express();

dotenv.config();

conectarDB();

const puerto = process.env.PORT || 4000;

servidor.listen(puerto, () => {
    console.log('Servidor corriendo en el puerto 4000');
})