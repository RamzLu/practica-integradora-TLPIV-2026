import { Subscription, type ISubscription } from '../models/Subscription.js';
import type { ISubscriptionRepository } from './interfaces/ISubscriptionRepository.js';

export class SubscriptionRepository implements ISubscriptionRepository {
    async create(userId: string, bookId: string): Promise<ISubscription> {
        const subscription = new Subscription({ user: userId, book: bookId });
        return await subscription.save();
    }

    async delete(userId: string, bookId: string): Promise<boolean> {
        const result = await Subscription.findOneAndDelete({ user: userId, book: bookId });
        return result !== null;
    }

    async findByBook(bookId: string): Promise<ISubscription[]> {
        return await Subscription.find({ book: bookId });
    }

    async findByUser(userId: string): Promise<ISubscription[]> {
        return await Subscription.find({ user: userId }).populate('book');
    }
}