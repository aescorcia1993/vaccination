import express from 'express';
import { Response, Request } from 'express';
const router = express.Router();

import { userInteractor } from '../../core/interactors';

router.post('/signup', async (req: Request, res: Response) => {
    const {status, data, error, message} = await userInteractor.signup(req.body);
    res.status(status).json({data, error, message});
});

router.post('/login', async (req: Request, res: Response) => {
    const {status, data, error, message} = await userInteractor.login(req.body);
    res.status(status).json({data, error, message});
});

export default router;
