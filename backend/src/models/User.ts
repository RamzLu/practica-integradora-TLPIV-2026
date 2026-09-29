import mongoose, {Schema, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    role: string;
}

const UserSchema: Schema = new Schema(
    {
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true 
        },
        password: { 
            type: String, 
            required: true 
        },
        role: { 
            type: String, 
            enum: ['admin', 'operador', 'usuario'], 
            default: 'usuario' 
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model<IUser>('User', UserSchema)