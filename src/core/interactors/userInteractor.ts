import { HTTP_STATUS } from "../const/http";
import User from "../entities/User";
import UserEntity from "../entities/User";
import IUserRepository from "../repositories/IUserRepository";
import { IResponse } from "./IResponse";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { SECRET_KEY } = process.env;

class UserInteractor {

    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async getById(id: number): Promise<IResponse<UserEntity>> {
        const userModel: UserEntity = await this.userRepository.getById(id);
        if (!userModel) {
          return { status : HTTP_STATUS.NOT_FOUND };

        }
        const user: any = {
          id: userModel.id,
          name: userModel.name,
          email: userModel.email,
        };
    
        return user;
      }

    async signup(userData: User): Promise<IResponse<UserEntity>> 
    {
        try {

            if(Object.values(userData).some(val => val === "")){

                return { status : HTTP_STATUS.BAD_REQUEST, message : 'Please fill all fields' };
            }



            const userEmail: UserEntity = await this.userRepository.verifyUser(userData.email);

            if (userEmail){
                return { status: HTTP_STATUS.BAD_REQUEST, message: "This user is registered"};
            }

            userData.password = bcrypt.hashSync(userData.password, 10);
            
            const user: UserEntity = await this.userRepository.createUser(userData);

            return { status: HTTP_STATUS.CREATE, data: user, message: "success" };
            
        } catch (error) {
            return { status: HTTP_STATUS.INTERNAL_ERROR, error: error.message };
        }
    }

    async login(userData: User): Promise<IResponse<string>> 
    {
        try {
            const user: UserEntity = await this.userRepository.verifyUser(userData.email);

            if (!user) {
                return { status: HTTP_STATUS.NOT_FOUND, message: 'User not found' };
            }

            const isValidPassword = user && bcrypt.compareSync(userData.password, user.password);

            if (isValidPassword) {

                const token = jwt.sign({ id: user.id, email: user.email}, SECRET_KEY,{ expiresIn: '1d' });
                return { status: HTTP_STATUS.OK, data: token, message: "Success" };

            } else {

                return { status: HTTP_STATUS.NOT_FOUND, message: 'User not registered or password incorrect' };
            }
            
        } catch (error) {
            return { status: HTTP_STATUS.INTERNAL_ERROR, error: error.message };
        }

    }

}

export default UserInteractor;