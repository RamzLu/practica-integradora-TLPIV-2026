import './config/env.js'
import { DatabaseConnection } from './database/DatabaseConnection.js'
import app from './app.js';
import { BookRepository } from './repositories/BookRepository.js';
import { EventPublisher } from './observer/EventPublisher.js';
import { BookService } from './services/BookService.js';
import { BookController } from './controllers/BookController.js';
import { createBookRoutes } from './routes/BookRoute.js';

async function start() {
    const db = DatabaseConnection.getInstance()
    await db.connect()

    const bookRepository = new BookRepository();
    const publisher = new EventPublisher();
    const bookService = new BookService(bookRepository, publisher);
    const bookController = new BookController(bookService);


 app.use('/api/books', createBookRoutes(bookController));

    const port = Number(process.env.API_PORT) || 3000;
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

start()