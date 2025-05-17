import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from '../schemas/field.schema';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
  ],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
