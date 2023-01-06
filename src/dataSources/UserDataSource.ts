import User from "../core/entities/User";
import IUserRepository from "../core/repositories/IUserRepository";
import UserModel from "./sequelize/models/UserModel";



class UserDataSource implements IUserRepository {
    
    public async getById(id: number): Promise<User> {
        const user = await UserModel.findOne({where: { id: id } });
        return user;
    }

    public async verifyUser(email: string): Promise<User> {
        const userModel = await UserModel.findOne({ where: { email } } );
        return userModel;
    }

    public async createUser(userData: any): Promise<User> {
        const userModel: User = await UserModel.create(userData);
        return userModel;
    }
    
}

export default UserDataSource;