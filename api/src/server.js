import express from 'express';
import 'dotenv/config';
import apiRoutes from './app/routes/auth.js';
import bodyParser from 'body-parser';
import cors from "cors";
import postRouter from './app/routes/post.js';
import relationRouter from './app/routes/relation.js';
const server = express();

server.use(cors({
    origin: '*'
}))

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use('/auth', apiRoutes);
server.use('/post', postRouter);
server.use('/relation', relationRouter);

server.listen(process.env.PORT, () => {
    console.log(`Server iniciado na porta ${process.env.PORT}`);
});