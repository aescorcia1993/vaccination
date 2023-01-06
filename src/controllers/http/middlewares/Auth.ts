import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

import { Response, NextFunction } from 'express';

import { userInteractor } from '../../../core/interactors';

dotenv.config();

const { SECRET_KEY } = process.env;

const auth = async ( req: any, res: Response, next: NextFunction,): Promise<void> => {
    
    const authorization = req.headers['authorization'] || req.headers['Authorization'];

    let accessToken
    if (authorization){
        accessToken = authorization.split(' ')[1];
    }
    
    try {
        
        const user: any = jwt.verify(accessToken, SECRET_KEY);
        const usermodel = await userInteractor.getById(user.id);
        
        if (usermodel) {
            req.CurrentUser = usermodel;
            next();
        } else {
            res.status(401).json({ status: 'error', message: 'Invalid token' });
        }

    } catch (error) {
        res.status(401).json({ status: 'error', message: error });
    }
}

export default auth;

