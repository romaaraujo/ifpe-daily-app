import express from 'express';
import 'dotenv/config';
import apiRoutes from './app/routes/auth.js';

const server = express();

server.use('/auth', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Server iniciado na porta ${process.env.PORT}`);
});