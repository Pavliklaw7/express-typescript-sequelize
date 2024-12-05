// This folder contains only one file, routes, which contains all of the modules' routes.

import authRouter from '@/modules/auth/auth.routes';
import userRouter from '@/modules/user/user.routes';
import express from 'express';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

export default router;
