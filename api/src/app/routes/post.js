import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()
const postRouter = express.Router();

postRouter.post('/post', async (req, res) => {
    const { token, content } = req.body;

    if (token == undefined || content == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const user = await prisma.user.findFirst({
        where: {
            token: token
        }
    })

    const post = await prisma.post.create({
        data: {
            authorId: user.id,
            content: content
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
            author: true
        }
    });

    return res.json(post);
})

export default postRouter;