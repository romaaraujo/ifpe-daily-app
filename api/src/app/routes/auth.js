import express from "express";

const authRouter = express.Router();

authRouter.get('/', (req, res) => {
    res.send('Hello World');
})

export default authRouter;