import type { Request, Response } from 'express';
import type { SubscriptionService } from '../services/SubscriptionService.js';

export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) {}

    subscribe = async (req: Request, res: Response): Promise<void> => {
        try {
            const { bookId } = req.body;
            // Asumimos que el middleware authenticate inyecta el id en req.user
            const userId = (req as any).user?.id; 
            const result = await this.subscriptionService.subscribe(userId, bookId);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la suscripción' });
        }
    }

    unsubscribe = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookId = req.params.bookId as string;
            const userId = (req as any).user?.id;
            
            await this.subscriptionService.unsubscribe(userId, bookId);
            res.status(200).json({ message: 'Suscripción cancelada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al cancelar la suscripción' });
        }
    }
}