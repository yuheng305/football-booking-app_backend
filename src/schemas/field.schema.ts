import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Field extends Document {
  @Prop({ required: true }) name: string;
  // @Prop({ default: 'available' }) status: 'available' | 'booked' | 'maintenance';
  @Prop({ required: true }) openHour: number;  // e.g., 7 (for 7:00)
  @Prop({ required: true }) closeHour: number; // e.g., 22
  @Prop({ required: true }) isMaintain: boolean;
  @Prop({ required: true }) clusterId: string; // e.g., userId or username
}
export const FieldSchema = SchemaFactory.createForClass(Field);
// export { Field };
