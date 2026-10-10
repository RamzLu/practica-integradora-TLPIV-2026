import { User, type IUser } from '../models/User.js';
import type { IUserRepository } from './interfaces/IUserRepository.js';

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email }).populate('role');
    }

    async findById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async findAll(): Promise<IUser[]> {
        return await User.find();
    }

    async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    }

    async updateRole(id: string, role: string): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, { role }, { new: true });
    }
}