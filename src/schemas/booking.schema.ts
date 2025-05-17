import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class ServiceEntry {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) price: number;
}

@Schema()
class Payment {
  @Prop({ default: false }) isPaid: boolean;
  @Prop() method: string;
  @Prop() paidAt: Date;
}

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) clusterId: string;
  @Prop({ required: true }) fieldId: string;
  @Prop({ required: true }) date: string; // e.g., 2025-04-24
  @Prop({ required: true }) startHour: number; // e.g., 7
  @Prop({ required: true }) duration: number; // e.g., 2 hours
  @Prop({ default: 'pending' }) status: 'pending' | 'completed' | 'cancelled';
  @Prop([ServiceEntry]) services: ServiceEntry[];
  @Prop(Payment) payment: Payment;
  @Prop() qrCode: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
