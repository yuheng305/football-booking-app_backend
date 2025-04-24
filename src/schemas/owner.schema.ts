import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Owner extends Document {
  @Prop({ required: true }) fullName: string;
  @Prop({ required: true, unique: true }) username: string;
  @Prop({ required: true }) password: string;
  @Prop({ required: true }) phone: string;
  @Prop({ required: true }) email: string;
  @Prop({ required: true }) clusterName: string;
  @Prop({ required: true }) address: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
