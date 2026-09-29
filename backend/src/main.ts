import './config/env.js'
import { DatabaseConnection } from './database/DatabaseConnection.js'

async function start() {
    const db = DatabaseConnection.getInstance()
    await db.connect()
}

start()