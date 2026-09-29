import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
    user: mongoose.Types.ObjectId;
    book: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const SubscriptionSchema: Schema = new Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        book: { 
            type: Schema.Types.ObjectId, 
            ref: 'Book', 
            required: true 
        }
    },
    {
        timestamps: true // para registra cuando se suscribio
    }
);

export const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);