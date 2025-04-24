import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field } from './field.schema';
import { StaticService } from './service.schema';
import { DynamicService } from './service.schema';
import { FieldSchema } from './field.schema';

@Schema({ timestamps: true })
export class Cluster extends Document {
  @Prop({ required: true }) ownerId: string;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) address: string;
  @Prop([FieldSchema]) fields: Field[];
  @Prop([StaticService]) staticServices: StaticService[];
  @Prop([DynamicService]) dynamicServices: DynamicService[];
}

export const ClusterSchema = SchemaFactory.createForClass(Cluster);
