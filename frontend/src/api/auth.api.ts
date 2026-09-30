import type { AuthResponse, User } from '../types'

const STORAGE_KEYS = {
	jwt: 'jwt_token',
	user: 'user_data',
}

function buildDemoUser(email: string): User {
	const normalizedEmail = email.trim().toLowerCase()

	if (normalizedEmail.includes('admin')) {
		return { id: 'demo-admin', email: normalizedEmail, role: 'admin' }
	}

	if (normalizedEmail.includes('operador') || normalizedEmail.includes('op')) {
		return { id: 'demo-operador', email: normalizedEmail, role: 'operador' }
	}

	return { id: 'demo-usuario', email: normalizedEmail, role: 'usuario' }
}

async function wait<T>(value: T): Promise<T> {
	return new Promise((resolve) => {
		window.setTimeout(() => resolve(value), 250)
	})
}

export async function login(email: string, password: string): Promise<AuthResponse> {
	if (!email || !password) {
		throw new Error('Email y contraseña son obligatorios.')
	}

	const user = buildDemoUser(email)
	const token = `demo-token-${user.id}-${user.email}`
	const response = { token, user }

	window.localStorage.setItem(STORAGE_KEYS.jwt, token)
	window.localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user))

	return wait(response)
}

export async function register(email: string, password: string): Promise<AuthResponse> {
	if (!email || !password || password.length < 8) {
		throw new Error('La contraseña debe tener al menos 8 caracteres.')
	}

	return login(email, password)
}

export function logoutSession() {
	window.localStorage.removeItem(STORAGE_KEYS.jwt)
	window.localStorage.removeItem(STORAGE_KEYS.user)
}
