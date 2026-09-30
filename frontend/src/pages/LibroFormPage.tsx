import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link, useParams } from 'react-router'
import { Can } from '../components/Can'
import { librosDeVistaPrevia } from '../data/librosPreview'
import type { LibroStatus } from '../types'

export function LibroFormPage() {
	const [message, setMessage] = useState('')
	const { id } = useParams()
	const book = id ? librosDeVistaPrevia.find((item) => item.id === id) : undefined
	const isEditing = Boolean(id)
	const permission = isEditing ? 'libro:update' : 'libro:create'

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault()
		setMessage('Datos validados. Falta guardar los cambios mediante la API.')
	}

	if (isEditing && !book) {
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
			<Can
				permission={permission}
				fallback={<p className="form-message" role="status">No tienes permiso para {isEditing ? 'editar' : 'crear'} libros.</p>}
			>
				<div className="auth-panel">
					<div className="auth-heading">
						<p className="eyebrow">Administración del catálogo</p>
						<h1>{isEditing ? 'Editar libro' : 'Nuevo libro'}</h1>
						<p>{isEditing ? 'Actualizá los datos del título.' : 'Completá los datos para agregar un título.'}</p>
					</div>
					<form className="auth-form" onSubmit={handleSubmit}>
						<label htmlFor="title">Título</label>
						<input id="title" name="titulo" type="text" maxLength={120} defaultValue={book?.titulo} required />
						<label htmlFor="description">Descripción</label>
						<textarea id="description" name="descripcion" rows={4} maxLength={1000} defaultValue={book?.descripcion} required />
						<label htmlFor="status">Estado inicial</label>
						<select id="status" name="estado" defaultValue={book?.estado ?? ('DISPONIBLE' satisfies LibroStatus)}>
							<option value="DISPONIBLE">Disponible</option>
							<option value="PRESTADO">Prestado</option>
							<option value="EN_REPARACION">En reparación</option>
						</select>
						<button className="button button-primary" type="submit">{isEditing ? 'Validar cambios' : 'Validar libro'}</button>
						{message && <p className="form-message" role="status">{message}</p>}
					</form>
				</div>
			</Can>
		</section>
	)
}
