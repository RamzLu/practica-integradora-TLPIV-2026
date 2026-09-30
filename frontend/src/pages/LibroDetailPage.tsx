import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Can } from '../components/Can'
import { librosDeVistaPrevia } from '../data/librosPreview'
import type { LibroStatus } from '../types'

const VALID_STATUSES: LibroStatus[] = ['DISPONIBLE', 'PRESTADO', 'EN_REPARACION']

const etiquetasEstado: Record<LibroStatus, string> = {
	DISPONIBLE: 'Disponible',
	PRESTADO: 'Prestado',
	EN_REPARACION: 'En reparación',
}

function getStoredStatusForBook(id: string | undefined, fallback: LibroStatus): LibroStatus {
	if (!id || typeof window === 'undefined') {
		return fallback
	}

	const savedStatus = window.localStorage.getItem(`libro-status-${id}`)
	if (savedStatus && VALID_STATUSES.includes(savedStatus as LibroStatus)) {
		return savedStatus as LibroStatus
	}

	return fallback
}

function formatDate(date: string) {
	return new Intl.DateTimeFormat('es-AR', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(new Date(date))
}

export function LibroDetailPage() {
	const [isSubscribed, setIsSubscribed] = useState(false)
	const [deletedPreviewIds, setDeletedPreviewIds] = useState<string[]>([])
	const { id } = useParams()
	const libro = librosDeVistaPrevia.find((item) => item.id === id)
	const [currentStatus, setCurrentStatus] = useState<LibroStatus>(() => getStoredStatusForBook(id, libro?.estado ?? 'DISPONIBLE'))

	useEffect(() => {
		if (!id) return
		const savedSubscription = window.localStorage.getItem(`libro-follow-${id}`)
		setIsSubscribed(savedSubscription === 'true')
		setCurrentStatus(getStoredStatusForBook(id, libro?.estado ?? 'DISPONIBLE'))
	}, [id, libro])

	useEffect(() => {
		if (!id) return
		window.localStorage.setItem(`libro-follow-${id}`, String(isSubscribed))
	}, [id, isSubscribed])

	useEffect(() => {
		if (!id) return
		window.localStorage.setItem(`libro-status-${id}`, currentStatus)
	}, [id, currentStatus])

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

	if (deletedPreviewIds.includes(libro.id)) {
		return (
			<section className="catalog-page">
				<div className="catalog-empty" role="status">
					<p className="eyebrow">Vista previa</p>
					<h1>Eliminación simulada</h1>
					<p>El libro no se quitó del backend ni del catálogo compartido.</p>
					<Link className="button button-quiet" to="/libros">Volver al catálogo</Link>
				</div>
			</section>
		)
	}

	const handleDeletePreview = () => {
		const confirmed = window.confirm(`¿Simular la eliminación de "${libro.titulo}"?`)
		if (confirmed) {
			setDeletedPreviewIds((current) => [...current, libro.id])
		}
	}

	return (
		<section className="catalog-page book-detail-page">
			<Link className="auth-switch" to="/libros">Volver al catálogo</Link>
			<div className="book-detail-layout">
				<div className={`book-detail-cover cover-${currentStatus.toLowerCase()}`} aria-label={`Cubierta de ${libro.titulo}`}>
					<span className="book-cover-kicker">Colección biblioteca</span>
					<div className="book-cover-center">
						<span className="book-cover-rule" />
						<span className="book-cover-title">{libro.titulo}</span>
					</div>
					<span className="book-cover-caption">Lecturas para descubrir</span>
				</div>
				<div className="book-detail-content">
					<header className="book-detail-heading">
						<p className="eyebrow">Detalle del libro</p>
						<h1>{libro.titulo}</h1>
						<p className="book-detail-description">{libro.descripcion}</p>
						<span className={`status-badge status-${currentStatus.toLowerCase()}`}>
							{etiquetasEstado[currentStatus]}
						</span>
					</header>
					<div className="detail-actions">
						<Can permission="libro:update">
							<Link className="button button-quiet" to={`/libros/${libro.id}/editar`}>Editar libro</Link>
						</Can>
						<Can permission="libro:delete">
							<button className="button button-danger" type="button" onClick={handleDeletePreview}>
								Eliminar libro
							</button>
						</Can>
						<Can permission="libro:change-status">
							<label className="catalog-filter">
								<span>Cambiar estado</span>
								<select
									value={currentStatus}
									onChange={(event) => setCurrentStatus(event.currentTarget.value as LibroStatus)}
								>
									<option value="DISPONIBLE">Disponible</option>
									<option value="PRESTADO">Prestado</option>
									<option value="EN_REPARACION">En reparación</option>
								</select>
							</label>
						</Can>
						<Can permission="subscription:create">
							{isSubscribed ? (
								<Can permission="subscription:delete">
									<button className="button button-quiet" type="button" onClick={() => setIsSubscribed(false)}>
										Dejar de seguir
									</button>
								</Can>
							) : (
								<button className="button button-primary" type="button" onClick={() => setIsSubscribed(true)}>
									Seguir libro
								</button>
							)}
						</Can>
					</div>
					{isSubscribed && <p className="subscription-status" role="status">Sigues este libro.</p>}
					<dl className="book-metadata">
						<div>
							<dt>Fecha de alta</dt>
							<dd>{formatDate(libro.createdAt)}</dd>
						</div>
						<div>
							<dt>Última actualización</dt>
							<dd>{formatDate(libro.updatedAt)}</dd>
						</div>
					</dl>
				</div>
			</div>
		</section>
	)
}
