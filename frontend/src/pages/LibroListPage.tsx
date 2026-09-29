export function LibroListPage() {
	return (
		<section className="catalog-page">
			<header className="catalog-heading">
				<div>
					<p className="eyebrow">Biblioteca</p>
					<h1>Catálogo de libros</h1>
					<p className="catalog-description">Consultá los títulos y su disponibilidad.</p>
				</div>
			</header>
			<div className="catalog-empty">
				<span className="empty-mark" aria-hidden="true">B</span>
				<h2>No hay libros para mostrar</h2>
				<p>El catálogo aparecerá aquí cuando esté disponible.</p>
			</div>
		</section>
	)
}
