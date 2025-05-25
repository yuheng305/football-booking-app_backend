import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Schedule {
  // @Prop({ required: true }) dayOfWeek: string; // e.g., Monday, Tuesday
  @Prop({ required: true }) date: Date; // e.g., 2023-10-01
  @Prop({ required: true }) startTime: number; // e.g., '07:00'
  @Prop({ required: true }) endTime: number; // e.g., '08:00'
  @Prop({ required: true }) status: 'available' | 'booked' | 'looking';
  @Prop({ required: true }) bookingId: string; // e.g., bookingId
  // @Prop({ required: true }) bookedBy: string; // e.g., userId or username
  // @Prop({ required: true }) fieldId: string; // e.g., fieldId
  // @Prop({ required: true }) clusterId: string; // e.g., clusterId
  // @Prop({ required: true }) createdAt: Date; // e.g., 2023-10-01T12:00:00Z
  // @Prop({ required: true }) updatedAt: Date; // e.g., 2023-10-01T12:00:00Z
  // @Prop({ required: true }) isDeleted: boolean; // e.g., false
  // @Prop({ required: true }) isPaid: boolean; // e.g., false
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);

@Schema()
class Field {
  @Prop({ required: true }) name: string;
  // @Prop({ default: 'available' }) status: 'available' | 'booked' | 'maintenance';
  @Prop({ required: true }) openHour: number;  // e.g., 7 (for 7:00)
  @Prop({ required: true }) closeHour: number; // e.g., 22
  @Prop({ required: true }) isMaintain: boolean;
  @Prop({ required: true }) ownerId: string; // e.g., userId or username
  @Prop([Schedule]) schedules: Schedule[];
}
export const FieldSchema = SchemaFactory.createForClass(Field);
export { Field };
