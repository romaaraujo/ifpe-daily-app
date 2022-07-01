import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()
const relationRouter = express.Router();

relationRouter.post('/get', async (req, res) => {
    const { token } = req.body;

    if (token == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const user = await prisma.user.findFirst({
        where: {
            token: token
        }
    })

    const relationsFollowing = await prisma.follows.findMany({
        where: {
            followerId: user.id
        },
        select: {
            following: {
                select: {
                    username: true
                }
            }
        }
    })

    const relationsFollower = await prisma.follows.findMany({
        where: {
            followingId: user.id
        },
        select: {
            follower: {
                select: {
                    username: true
                }
            }
        }
    })

    return res.json([relationsFollowing, relationsFollower]);
})

relationRouter.post('/new', async (req, res) => {
    const { token, userFollow } = req.body;

    if (token, userFollow == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const user = await prisma.user.findFirst({
        where: {
            token: token
        },
        include: {
            following: true
        }
    })

    const follow = await prisma.user.findFirst({
        where: {
            username: userFollow
        }
    })

    if (!follow) return res.status(400).json({ error: 'Usuário não localizado' });
    if (follow.id === user.id) return res.status(400).json({ error: 'Você não pode seguir a si mesmo' });

    const isFollow = await prisma.follows.findFirst({
        where: {
            AND: [
                { followerId: user.id },
                { followingId: follow.id }
            ]
        }
    })

    if (isFollow) return res.status(400).json({ error: 'Você já segue este usuário' });

    await prisma.follows.create({
        data: {
            followerId: user.id,
            followingId: follow.id
        }
    })

    return res.json({});
})

export default relationRouter;