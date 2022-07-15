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
            id: true,
            content: true,
            createdAt: true,
            author: true,
            score: true,
            label: true,
            likes: true
        }
    });
    
    return res.json(post);
})

postRouter.post('/trend', async (req, res) => {
    const { token } = req.body;

    if (token == undefined) return res.status(400).json({ error: 'Dados insuficientes' });

    const day = new Date().toISOString();
    const post = await prisma.post.findMany({
        where: {
            content: {
                contains: '#',
            }
        }   
    });

    let hashtags = [];
    
    post.forEach(p => {
        let tempHashtags = [];
        
        const hashtag = p.content.match(/(^|\s)(#[a-z\d-]+)/ig);
        hashtag.forEach(h => {
            if(!tempHashtags.includes(h)) {
                tempHashtags.push(h);
            }
        })
        
        tempHashtags.forEach(h => {
            hashtags.push(h.trim());
        })
    })

    let count = {};
    hashtags.forEach(function(i) { count[i] = (count[i]||0) + 1;});
    
    const sorted = Object.keys(count).sort(function(a,b){return count[a]-count[b]})

    return res.json(sorted);
})

const sortObject = obj => {
    const sorter = (a, b) => {
       return obj[a] - obj[b];
    };
    const keys = Object.keys(obj);
    keys.sort(sorter);
    const res = {};
    keys.forEach(key => {
       res[key] = obj[key];
    });
    return res;
 };

export default postRouter;