import { Router } from 'express';
import type { BookController } from '../controllers/BookController.js';

export function createBookRoutes(controller: BookController): Router {
    const router = Router();

    router.get('/', controller.getAll);
    router.get('/:id', controller.getById);
    router.post('/', controller.create);
    router.put('/:id', controller.update);
    router.patch('/:id/status', controller.changeStatus);
    router.delete('/:id', controller.delete);

    return router;
}