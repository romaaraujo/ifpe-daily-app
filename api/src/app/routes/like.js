import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import axios from 'axios';

const prisma = new PrismaClient()
const likeRouter = express.Router();


likeRouter.post('/', async (req, res) => {
    const { token, postId } = req.body;

    if (token == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const user = await prisma.user.findFirst({
        where: {
            token: token
        },
        include: {
            following: true
        }
    })

    const like = await prisma.like.findFirst({
        where: {
            authorId: user.id,
            postId: postId,
            unlike: false
        }
    })
    
    if (!like) {
        await prisma.like.create({
            data: {
                authorId: user.id,
                postId: postId,
                unlike: false
            }
        })
    } else {
        await prisma.like.delete({
            where: {
                id: like.id
            }
        })
    }

    return res.json({});
})

likeRouter.post('/unlike', async (req, res) => {
    const { token, postId } = req.body;

    if (token == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const user = await prisma.user.findFirst({
        where: {
            token: token
        },
        include: {
            following: true
        }
    })

    const like = await prisma.like.findFirst({
        where: {
            authorId: user.id,
            postId: postId,
            unlike: true
        }
    })

    if (!like) {
        await prisma.like.create({
            data: {
                authorId: user.id,
                postId: postId,
                unlike: true
            }
        })
    } else {
        await prisma.like.delete({
            where: {
                id: like.id
            }
        })
    }

    return res.json({});
})

export default likeRouter;