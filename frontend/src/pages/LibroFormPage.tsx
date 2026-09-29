import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link } from 'react-router'
import { Can } from '../components/Can'
import type { LibroStatus } from '../types'

export function LibroFormPage() {
	const [message, setMessage] = useState('')

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault()
		setMessage('Formulario validado. Falta guardar el libro mediante la API.')
	}

	return (
		<section className="catalog-page">
			<Link className="auth-switch" to="/libros">Volver al catálogo</Link>
			<Can
				permission="libro:create"
				fallback={<p className="form-message" role="status">No tienes permiso para crear libros.</p>}
			>
				<div className="auth-panel">
					<div className="auth-heading">
						<p className="eyebrow">Administración del catálogo</p>
						<h1>Nuevo libro</h1>
						<p>Completá los datos para agregar un título.</p>
					</div>
					<form className="auth-form" onSubmit={handleSubmit}>
						<label htmlFor="title">Título</label>
						<input id="title" name="titulo" type="text" maxLength={120} required />
						<label htmlFor="description">Descripción</label>
						<textarea id="description" name="descripcion" rows={4} maxLength={1000} required />
						<label htmlFor="status">Estado inicial</label>
						<select id="status" name="estado" defaultValue={'DISPONIBLE' satisfies LibroStatus}>
							<option value="DISPONIBLE">Disponible</option>
							<option value="PRESTADO">Prestado</option>
							<option value="EN_REPARACION">En reparación</option>
						</select>
						<button className="button button-primary" type="submit">Revisar datos</button>
						{message && <p className="form-message" role="status">{message}</p>}
					</form>
				</div>
			</Can>
		</section>
	)
}
