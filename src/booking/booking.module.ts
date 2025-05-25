import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../schemas/booking.schema';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingCron } from './booking.cron';
import { Field, FieldSchema } from 'src/schemas/field.schema';
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
  controllers: [BookingController],
  providers: [BookingService,BookingCron],
})
export class BookingModule {}
