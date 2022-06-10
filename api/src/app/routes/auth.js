import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(401).json({ error: 'Login ou senha inválidos' });

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) return res.status(401).json({ error: 'Login ou senha inválidos!' });

    // const checkPassword = bcrypt.compareSync(password, user.password)
    // if (!checkPassword) return res.status(401).json({ error: 'Login ou senha inválidos!' });

    if (password != user.password) return res.status(401).json({ error: 'Login ou senha inválidos!' });

    delete user.password;
    const accessToken = '123';
    return res.json({ ...user, accessToken });
})

authRouter.post('/singup', async (req, res) => {
    const { email, password, confirmPassword, username } = req.body;

    if (!email || !password || !confirmPassword || !username) return res.status(400).json({ error: 'Dados insuficientes' });

    if (password !== confirmPassword) return res.status(400).json({ error: 'As senhas não batem' });

    if (
        await prisma.user.findUnique({
            where: {
                email
            }
        })
    ) return res.status(400).json({ error: 'E-mail já existe' });

    const user = await prisma.user.create({
        data: {
            email,
            password,
            username
        }
    })

    delete user.password

    return res.status(201).send(user);
})

export default authRouter;