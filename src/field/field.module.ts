import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Field, FieldSchema } from '../schemas/field.schema';
import { Booking, BookingSchema } from '../schemas/booking.schema'; // Thêm dòng này
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { Owner, OwnerSchema } from 'src/schemas/owner.schema';
import { Cluster, ClusterSchema } from 'src/schemas/cluster.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Field.name, schema: FieldSchema },
      { name: Booking.name, schema: BookingSchema }, // Thêm dòng này
      { name: Owner.name, schema: OwnerSchema }, // Nếu bạn cần sử dụng Owner, hãy thêm dòng này
      { name: Cluster.name, schema: ClusterSchema }, // Nếu bạn cần sử dụng Cluster, hãy thêm dòng này
    ]),
  ],
  controllers: [FieldController],
  providers: [FieldService],
  exports: [FieldService],
})
export class FieldModule {}