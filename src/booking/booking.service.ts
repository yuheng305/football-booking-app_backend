import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Booking } from '../schemas/booking.schema';
import { BookingDto } from 'src/auth/dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async createBooking(dto: BookingDto): Promise<Booking> {
    const booking = new this.bookingModel();
    booking.userId = dto.userId;
    booking.clusterId = dto.clusterId;
    booking.fieldId = dto.fieldId;
    booking.createdAt = now();
    booking.date = dto.date;
    booking.startHour = dto.startHour;
    booking.status = 'pending';
    booking.services = dto.services.map(service => ({
      name: service.name,
      price: service.price,
    }));
    return booking.save();
  }

  async getBookingById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async getAllBookingsByUserId(userId: string): Promise<Booking[]> {
    return this.bookingModel.find({ userId }).exec();
  }
}
