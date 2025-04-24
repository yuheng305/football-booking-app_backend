import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
class StaticService {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) price: number;
}

@Schema()
class DynamicService {
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) price: number;
}

export { StaticService, DynamicService };
