import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import axios from 'axios';

const prisma = new PrismaClient()
const postRouter = express.Router();


postRouter.post('/post', async (req, res) => {
    const { token, content } = req.body;

    if (token == undefined || content == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const authorization = Buffer.from("2406-eTg0rWOo" + ":" + "OudbG5QX47cHlGiiHROp5UO0YMvy9Zmy", 'utf-8').toString('base64')
    let sentimento = [];
    await axios.post('https://api.gotit.ai/NLU/v1.5/Analyze', {
        T: content,
        S: true,
        EM: true
    },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + authorization
            }
        }).then((data) => {
            sentimento['score'] = '' + data.data.sentiment.score;
            sentimento['label'] = data.data.sentiment.label;
        }).catch((data) => {
            return res.status(400).json({ error: 'Erro na análise de sentimento' });
        })

    const user = await prisma.user.findFirst({
        where: {
            token: token
        }
    })

    const post = await prisma.post.create({
        data: {
            authorId: user.id,
            content: content,
            score: sentimento['score'],
            label: sentimento['label']
        }
    })

    return res.json(post);
})

postRouter.post('/get', async (req, res) => {
    const { token } = req.body;

    if (token == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const user = await prisma.user.findFirst({
        where: {
            token: token
        },
        include: {
            following: true
        }
    })

    const usersRelation = user.following.map((v) => { return v.followingId })
    usersRelation.push(user.id);

    const post = await prisma.post.findMany({
        where: {
            authorId: { in: usersRelation }
        },
        select: {
            content: true,
            createdAt: true,
            author: true,
            score: true,
            label: true
        }
    });

    return res.json(post);
})

export default postRouter;