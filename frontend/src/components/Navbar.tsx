import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export function Navbar() {
	const { user, logout } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/login', { replace: true })
	}

	return (
		<header className="site-header">
			<Link className="brand" to="/libros" aria-label="Biblioteca, inicio">
				<span className="brand-mark" aria-hidden="true">B</span>
				<span>Biblioteca</span>
			</Link>
			<nav className="primary-nav" aria-label="Navegación principal">
				<Link to="/libros">Catálogo</Link>
			</nav>
			<div className="account-area">
				<span className="account-email">{user?.email}</span>
				<button className="button button-quiet" type="button" onClick={handleLogout}>
					Cerrar sesión
				</button>
			</div>
		</header>
	)
}
