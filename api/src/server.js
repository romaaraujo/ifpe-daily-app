import express from 'express';
import 'dotenv/config';
import apiRoutes from './app/routes/auth.js';
import bodyParser from 'body-parser';
import cors from "cors";
const server = express();

server.use(cors({
    origin: '*'
}))

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/auth', apiRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Server iniciado na porta ${process.env.PORT}`);
});