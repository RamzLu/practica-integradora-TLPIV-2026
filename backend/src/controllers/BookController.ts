import type { Request, Response } from 'express';
import { BookService } from '../services/BookService.js';
import { BookStatus } from '../models/Book.js';

export class BookController {
    constructor(private readonly bookService: BookService) {}

    // listar todos los libros
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = await this.bookService.getAll();
            res.status(200).json(books);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    // obtener un libro por id
    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const book = await this.bookService.getById(id as string);
            if (!book) {
                res.status(404).json({ message: 'Libro no encontrado' });
                return;
            }
            res.status(200).json(book);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    // crear un libro
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { title, description } = req.body;
            if (!title || !description) {
                res.status(400).json({ message: 'title y description son obligatorios' });
                return;
            }
            const newBook = await this.bookService.create(req.body);
            res.status(201).json(newBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    // actualizar un libro
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updatedBook = await this.bookService.update(id as string, req.body);
            if (!updatedBook) {
                res.status(404).json({ message: 'Libro no encontrado' });
                return;
            }
            res.status(200).json(updatedBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    // cambiar el estado de un libro
    changeStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // validar que sea un valor real del enum, no solo que exista
            if (!Object.values(BookStatus).includes(status)) {
                res.status(400).json({
                    message: `Estado inválido. Valores permitidos: ${Object.values(BookStatus).join(', ')}`
                });
                return;
            }

            const updatedBook = await this.bookService.changeStatus(id as string, status as BookStatus);
            if (!updatedBook) {
                res.status(404).json({ message: 'Libro no encontrado' });
                return;
            }
            res.status(200).json(updatedBook);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };

    // eliminar un libro
    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const deleted = await this.bookService.delete(id as string);
            if (!deleted) {
                res.status(404).json({ message: 'Libro no encontrado' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    };
}