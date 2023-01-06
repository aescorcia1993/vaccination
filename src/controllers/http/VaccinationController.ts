import express from 'express';
import { Response, Request } from 'express';
const router = express.Router();

import { vaccinationInteractor } from '../../core/interactors';

import auth from './middlewares/Auth';

router.post('', auth, async (req: Request, res: Response) => {
    const {status, data, error, message} = await vaccinationInteractor.create(req.body);
    res.status(status).json({data, error, message});
});

router.put('/:id', auth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const {status, data, error, message} = await vaccinationInteractor.update(req.body, parseInt(id));
    res.status(status).json({data, error, message});
});

router.get('', auth, async (req: Request, res: Response) => {
    const {status, data, error, message} = await vaccinationInteractor.getAll();
    res.status(status).json({data, error, message});
});

router.delete('/:id', auth, async (req: Request, res: Response) => {
    const { id } = req.params;
    const {status, data, error, message} = await vaccinationInteractor.delete( parseInt(id));
    res.status(status).json({data, error, message});
});

export default router;
