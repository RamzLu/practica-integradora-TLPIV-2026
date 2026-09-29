import { Link, useParams } from 'react-router'
import { librosDeVistaPrevia } from '../data/librosPreview'
import type { LibroStatus } from '../types'

const etiquetasEstado: Record<LibroStatus, string> = {
	DISPONIBLE: 'Disponible',
	PRESTADO: 'Prestado',
	EN_REPARACION: 'En reparación',
}

function formatDate(date: string) {
	return new Intl.DateTimeFormat('es-AR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date))
}

export function LibroDetailPage() {
	const { id } = useParams()
	const libro = librosDeVistaPrevia.find((item) => item.id === id)

	if (!libro) {
		return (
			<section className="catalog-page">
				<Link className="auth-switch" to="/libros">Volver al catálogo</Link>
				<div className="catalog-empty">
					<h1>Libro no encontrado</h1>
					<p>No hay un libro de vista previa con ese identificador.</p>
				</div>
			</section>
		)
	}

	return (
		<section className="catalog-page">
			<Link className="auth-switch" to="/libros">Volver al catálogo</Link>
			<header className="catalog-heading">
				<div>
					<p className="eyebrow">Detalle del libro</p>
					<h1>{libro.titulo}</h1>
					<p className="catalog-description">{libro.descripcion}</p>
				</div>
				<span className={`status-badge status-${libro.estado.toLowerCase()}`}>
					{etiquetasEstado[libro.estado]}
				</span>
			</header>
			<dl className="book-metadata">
				<div>
					<dt>Creado</dt>
					<dd>{formatDate(libro.createdAt)}</dd>
				</div>
				<div>
					<dt>Última actualización</dt>
					<dd>{formatDate(libro.updatedAt)}</dd>
				</div>
			</dl>
		</section>
	)
}
