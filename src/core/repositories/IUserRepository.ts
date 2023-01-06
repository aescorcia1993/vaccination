import User from '../entities/User';

interface IUserRepository {
  createUser(user: any): Promise<User>;
  verifyUser(email: string): Promise<User>;
  getById(id: number): Promise<User>;
}
export default IUserRepository;