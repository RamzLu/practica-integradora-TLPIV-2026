import { librosDeVistaPrevia } from '../data/librosPreview'
import type { Libro, LibroStatus } from '../types'

const STORAGE_KEY = 'libros-preview-cache'

function readCache(): Libro[] {
	const cached = window.localStorage.getItem(STORAGE_KEY)
	if (!cached) return [...librosDeVistaPrevia]

	try {
		return JSON.parse(cached) as Libro[]
	} catch {
		window.localStorage.removeItem(STORAGE_KEY)
		return [...librosDeVistaPrevia]
	}
}

function saveCache(books: Libro[]) {
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
}

async function wait<T>(value: T): Promise<T> {
	return new Promise((resolve) => {
		window.setTimeout(() => resolve(value), 200)
	})
}

export async function getLibros(): Promise<Libro[]> {
	return wait(readCache())
}

export async function getLibroById(id: string): Promise<Libro | undefined> {
	return wait(readCache().find((book) => book.id === id))
}

export async function createLibro(payload: Omit<Libro, 'id' | 'createdAt' | 'updatedAt'>): Promise<Libro> {
	const books = readCache()
	const next: Libro = {
		id: `libro-${Date.now()}`,
		...payload,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
	}
	const updated = [next, ...books]
	saveCache(updated)
	return wait(next)
}

export async function updateLibro(id: string, payload: Partial<Libro>): Promise<Libro> {
	const books = readCache()
	const index = books.findIndex((book) => book.id === id)
	if (index === -1) {
		throw new Error('Libro no encontrado.')
	}

	const updated = {
		...books[index],
		...payload,
		updatedAt: new Date().toISOString(),
	} satisfies Libro
	books[index] = updated
	saveCache(books)
	return wait(updated)
}

export async function deleteLibro(id: string): Promise<void> {
	const books = readCache().filter((book) => book.id !== id)
	saveCache(books)
	return wait(undefined)
}

export async function changeLibroStatus(id: string, estado: LibroStatus): Promise<Libro> {
	return updateLibro(id, { estado })
}
