import type { Notification } from '../types'

const STORAGE_KEY = 'notification-preview'

function readNotifications(): Notification[] {
	const saved = window.localStorage.getItem(STORAGE_KEY)
	if (!saved) {
		return [
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
	}

	try {
		return JSON.parse(saved) as Notification[]
	} catch {
		window.localStorage.removeItem(STORAGE_KEY)
		return readNotifications()
	}
}

export async function getNotifications(): Promise<Notification[]> {
	return new Promise((resolve) => {
		window.setTimeout(() => resolve(readNotifications()), 150)
	})
}

export async function markNotificationAsRead(id: string): Promise<Notification[]> {
	const notifications = readNotifications().map((notification) => (
		notification.id === id ? { ...notification, isRead: true } : notification
	))
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
	return notifications
}
