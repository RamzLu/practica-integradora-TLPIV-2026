import bcrypt from 'bcrypt';
import { User } from '../models/User.js';
import '../config/env.js'; 
import { DatabaseConnection } from './DatabaseConnection.js';

async function runSeed() {
    try {
        console.log('Iniciando carga de datos con seed.js...');
        const db = DatabaseConnection.getInstance();
        await db.connect();
        await User.deleteMany({});
        console.log('coleccion de usuarios limpiada.');

        const saltRounds = 10;
        const hashed_password = await bcrypt.hash('tlp42026', saltRounds);

        const testUsers = [
            { email: 'admin@tp.com', password: hashed_password, role: 'admin' },
            { email: 'operador@tp.com', password: hashed_password, role: 'operador' },
            { email: 'usuario@tp.com', password: hashed_password, role: 'usuario' }
        ];

        await User.insertMany(testUsers);
        console.log('Usuarios de prueba insertados con éxito:');
        console.log('- admin@tp.com (Rol: admin)');
        console.log('- operador@tp.com (Rol: operador)');
        console.log('- usuario@tp.com (Rol: usuario)');
        console.log('Contraseña para todos: tlp42026');

        process.exit(0); 
    } catch (error) {
        console.error('Error ejecutando el seed:', error);
        process.exit(1);
    }
}

runSeed();