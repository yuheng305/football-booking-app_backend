import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class ServiceEntry {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) price: number;
}

@Schema({ timestamps: true })
export class Booking extends Document {
  @Prop({ required: true }) userId: string;
  @Prop({ required: true }) clusterId: string;
  @Prop({ required: true }) fieldId: string;
  @Prop({ required: true }) createdAt: Date;
  @Prop({ required: true }) date: string; // e.g., 2025-04-24
  @Prop({ required: true }) startHour: number; // e.g., 7
  @Prop({ default: 'pending' }) status: 'pending' | 'completed' | 'canceled';
  @Prop([ServiceEntry]) services: ServiceEntry[];
  @Prop() qrCode: string;
  // @Prop({required: true }) slotOfBooking: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
