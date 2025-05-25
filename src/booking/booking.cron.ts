// booking.cron.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from '../schemas/booking.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookingCron {
    private readonly logger = new Logger(BookingCron.name);

    constructor(
        @InjectModel(Booking.name)
        private readonly bookingModel: Model<Booking>,
    ) {}

    // Chạy mỗi phút
    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleBookingExpiry() {
        const now = new Date();
        const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

        const result = await this.bookingModel.updateMany(
        {
            status: 'pending',
            createdAt: { $lt: fiveMinutesAgo },
        },
        {
            $set: { status: 'cancelled' },
        },
        );
        console.log('hehe');
        if (result.modifiedCount > 0) {
        this.logger.log(`Đã tự động hủy ${result.modifiedCount} booking quá hạn.`);
        }
    }
}
