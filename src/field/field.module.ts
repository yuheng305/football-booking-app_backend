import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from '../schemas/field.schema';
import { Booking, BookingSchema } from '../schemas/booking.schema'; // Thêm dòng này
import { FieldService } from './field.service';
import { FieldController } from './field.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Field.name, schema: FieldSchema },
      { name: Booking.name, schema: BookingSchema }, // Thêm dòng này
    ]),
  ],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}