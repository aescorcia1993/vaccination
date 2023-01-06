import express from 'express';
import { Response, Request } from 'express';
const router = express.Router();

import { drugInteractor } from '../../core/interactors';

import auth from './middlewares/Auth';

router.post('', auth, async (req: Request, res: Response) => {
    const {status, data, error, message} = await drugInteractor.create(req.body);
    res.status(status).json({data, error, message});
});

router.put('/:id', auth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const {status, data, error, message} = await drugInteractor.update(req.body, parseInt(id));
    res.status(status).json({data,error,message});
});

router.get('', auth, async (req: Request, res: Response) => {
    const {status, data, error, message} = await drugInteractor.getAll();
    res.status(status).json({data, error, message});
});

router.delete('/:id', auth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const {status, data, error, message} = await drugInteractor.delete(parseInt(id));
    res.status(status).json({data, error, message});
});

export default router;