//este env es para que ts pueda reconocer las variables de entorno y usa dotenv
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.resolve(__dirname, '../../../.env')})