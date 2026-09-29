import { useState } from 'react'
import { Link } from 'react-router'
import { Can } from '../components/Can'
import type { Libro, LibroStatus } from '../types'

const librosDeVistaPrevia: Libro[] = [
	{
		id: 'libro-1',
		titulo: 'El mapa de las mareas',
		descripcion: 'Una cartógrafa busca una isla que aparece solo al amanecer.',
		estado: 'DISPONIBLE',
		createdAt: '2026-09-10T12:00:00.000Z',
		updatedAt: '2026-09-20T12:00:00.000Z',
	},
	{
		id: 'libro-2',
		titulo: 'La casa de los relojes',
		descripcion: 'En una casa antigua, cada reloj marca una hora distinta.',
		estado: 'PRESTADO',
		createdAt: '2026-09-12T12:00:00.000Z',
		updatedAt: '2026-09-22T12:00:00.000Z',
	},
	{
		id: 'libro-3',
		titulo: 'Jardín de invierno',
		descripcion: 'Notas sobre las plantas que sobreviven al frío.',
		estado: 'EN_REPARACION',
		createdAt: '2026-09-15T12:00:00.000Z',
		updatedAt: '2026-09-25T12:00:00.000Z',
	},
]

const etiquetasEstado: Record<LibroStatus, string> = {
	DISPONIBLE: 'Disponible',
	PRESTADO: 'Prestado',
	EN_REPARACION: 'En reparación',
}

function formatDate(date: string) {
	return new Intl.DateTimeFormat('es-AR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	}).format(new Date(date))
}

export function LibroListPage() {
	const [query, setQuery] = useState('')
	const [statusFilter, setStatusFilter] = useState<LibroStatus | 'TODOS'>('TODOS')
	const normalizedQuery = query.trim().toLocaleLowerCase('es')
	const visibleBooks = librosDeVistaPrevia.filter((book) => {
		const matchesQuery = `${book.titulo} ${book.descripcion}`.toLocaleLowerCase('es').includes(normalizedQuery)
		const matchesStatus = statusFilter === 'TODOS' || book.estado === statusFilter
		return matchesQuery && matchesStatus
	})

	return (
		<section className="catalog-page">
			<header className="catalog-heading">
				<div>
					<p className="eyebrow">Biblioteca</p>
					<h1>Catálogo de libros</h1>
					<p className="catalog-description">Consultá los títulos y su disponibilidad.</p>
				</div>
				<div className="account-area">
					<p className="catalog-count">{visibleBooks.length} resultados</p>
					<Can permission="libro:create">
						<Link className="button button-primary" to="/libros/nuevo">Nuevo libro</Link>
					</Can>
				</div>
			</header>

			<div className="catalog-toolbar">
				<label className="catalog-search">
					<span>Buscar libros</span>
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.currentTarget.value)}
						placeholder="Título o descripción"
					/>
				</label>
				<label className="catalog-filter">
					<span>Estado</span>
					<select
						value={statusFilter}
						onChange={(event) => setStatusFilter(event.currentTarget.value as LibroStatus | 'TODOS')}
					>
						<option value="TODOS">Todos</option>
						<option value="DISPONIBLE">Disponible</option>
						<option value="PRESTADO">Prestado</option>
						<option value="EN_REPARACION">En reparación</option>
					</select>
				</label>
			</div>

			<div className="catalog-table-wrap">
				<table className="catalog-table">
					<thead>
						<tr>
							<th scope="col">Libro</th>
							<th scope="col">Estado</th>
							<th scope="col">Actualizado</th>
						</tr>
					</thead>
					<tbody>
						{visibleBooks.map((book) => (
							<tr key={book.id}>
								<td>
									<strong>{book.titulo}</strong>
									<span className="book-description">{book.descripcion}</span>
								</td>
								<td>
									<span className={`status-badge status-${book.estado.toLowerCase()}`}>
										{etiquetasEstado[book.estado]}
									</span>
								</td>
								<td className="book-date">{formatDate(book.updatedAt)}</td>
							</tr>
						))}
					</tbody>
				</table>
				{visibleBooks.length === 0 && (
					<p className="catalog-no-results" role="status">No hay libros que coincidan con la búsqueda.</p>
				)}
			</div>
		</section>
	)
}
