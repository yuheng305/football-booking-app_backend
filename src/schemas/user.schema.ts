import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true, unique: true }) username: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) email: string;
  @Prop({ default: [] }) bookingHistory: string[]; // Array of Booking IDs
}

export const UserSchema = SchemaFactory.createForClass(User);
