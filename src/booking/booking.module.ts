import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from '../schemas/booking.schema';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingCron } from './booking.cron';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [BookingController],
  providers: [BookingService,BookingCron],
})
export class BookingModule {}
