import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Schedule {
  @Prop({ required: true }) dayOfWeek: string; // e.g., Monday, Tuesday
  @Prop({ required: true }) openHour: number;  // e.g., 7 (for 7:00)
  @Prop({ required: true }) closeHour: number; // e.g., 22
}

@Schema()
class Field {
  @Prop({ required: true }) name: string;
  @Prop({ default: 'available' }) status: 'available' | 'booked' | 'maintenance';
  @Prop([Schedule]) schedules: Schedule[];
}
export const FieldSchema = SchemaFactory.createForClass(Field);
export { Field };
