import './config/env.js'
import { DatabaseConnection } from './database/DatabaseConnection.js'
import app from './app.js';
import { BookRepository } from './repositories/BookRepository.js';
import { EventPublisher } from './observer/EventPublisher.js';
import { BookService } from './services/BookService.js';
import { BookController } from './controllers/BookController.js';
import { createBookRoutes } from './routes/BookRoute.js';
import { UserRepository } from './repositories/UserRepository.js';
import { RoleRepository } from './repositories/RoleRepository.js';
import { AuthService } from './services/AuthService.js';
import { AuthController } from './controllers/AuthController.js';
import { createAuthRoutes } from './routes/AuthRoute.js';

async function start() {
    const db = DatabaseConnection.getInstance()
    await db.connect()

    const bookRepository = new BookRepository();
    const publisher = new EventPublisher();
    const bookService = new BookService(bookRepository, publisher);
    const bookController = new BookController(bookService);
    const jwtSecret = process.env.JWT_SECRET;
    
if (!jwtSecret) {
    throw new Error('Falta la variable de entorno JWT_SECRET');
}

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();
const authService = new AuthService(userRepository, roleRepository, jwtSecret);
const authController = new AuthController(authService);


 app.use('/api/books', createBookRoutes(bookController));
 app.use('/api/auth', createAuthRoutes(authController));

    const port = Number(process.env.API_PORT) || 3000;
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

start()