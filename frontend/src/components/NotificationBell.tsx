import { useState } from 'react'
import type { Notification } from '../types'

const notificacionesDeVistaPrevia: Notification[] = [
	{
		id: 'notificacion-1',
		userId: 'usuario-demo',
		message: 'El mapa de las mareas está disponible.',
		isRead: false,
		createdAt: '2026-09-25T15:30:00.000Z',
	},
	{
		id: 'notificacion-2',
		userId: 'usuario-demo',
		message: 'La casa de los relojes cambió de estado.',
		isRead: true,
		createdAt: '2026-09-24T11:00:00.000Z',
	},
]

function formatDate(date: string) {
	return new Intl.DateTimeFormat('es-AR', {
		day: '2-digit',
		month: 'short',
	}).format(new Date(date))
}

export function NotificationBell() {
	const [notifications, setNotifications] = useState(notificacionesDeVistaPrevia)
	const unreadCount = notifications.filter((notification) => !notification.isRead).length

	const markAsRead = (id: string) => {
		setNotifications((current) => current.map((notification) => (
			notification.id === id ? { ...notification, isRead: true } : notification
		)))
	}

	return (
		<details className="notification-menu">
			<summary
				className="notification-trigger"
				aria-label={unreadCount > 0 ? `Notificaciones, ${unreadCount} sin leer` : 'Notificaciones'}
				title="Notificaciones"
			>
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
					<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
				{unreadCount > 0 && <span className="notification-count" aria-hidden="true">{unreadCount}</span>}
			</summary>
			<section className="notification-panel" aria-label="Bandeja de notificaciones">
				<header className="notification-panel-heading">
					<div>
						<p className="notification-panel-title">Notificaciones</p>
						<p className="notification-preview-label">Vista previa local</p>
					</div>
					<span className="notification-unread-summary">{unreadCount} sin leer</span>
				</header>
				{notifications.length === 0 ? (
					<p>No tienes notificaciones.</p>
				) : (
					<ul className="notification-list">
						{notifications.map((notification) => (
							<li className={notification.isRead ? 'notification-item' : 'notification-item is-unread'} key={notification.id}>
								<p>{notification.message}</p>
								<time dateTime={notification.createdAt}>{formatDate(notification.createdAt)}</time>
								{!notification.isRead && (
									<button className="notification-read-button" type="button" onClick={() => markAsRead(notification.id)}>
										Marcar como leída
									</button>
								)}
							</li>
						))}
					</ul>
				)}
			</section>
		</details>
	)
}
