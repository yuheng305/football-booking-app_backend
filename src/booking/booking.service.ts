import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now } from 'mongoose';
import { Booking } from '../schemas/booking.schema';
import { BookingDto } from 'src/auth/dto/booking.dto';
import { Owner } from 'src/schemas/owner.schema';
import { Cluster } from 'src/schemas/cluster.schema';
import { Field } from 'src/schemas/field.schema';
import { BookingResponseDto } from 'src/auth/dto/bookingresponse.dto';
import { BookingHistoryDto } from 'src/auth/dto/bookinghistory.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Owner.name) private ownerModel: Model<Owner>,
    @InjectModel(Cluster.name) private clusterModel: Model<Cluster>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
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

  async getBookingById(id: string): Promise<BookingResponseDto> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    const cluster = await this.clusterModel.findById(booking.clusterId).exec();
    if (!cluster) {
      throw new NotFoundException(`Cluster with ID ${booking.clusterId} not found`);
    }
    const field = await this.fieldModel.findById(booking.fieldId).exec();
    if (!field) {
      throw new NotFoundException(`Field with ID ${booking.fieldId} not found`);
    }
    let price = 0;
    let serviceResponse = booking.services || [];
    for (const service of booking.services) {
      price += service.price;
    }

    for (const service of cluster.staticServices) {
      price += service.price;
      serviceResponse.push({
        name: service.name,
        price: service.price,
      });
    }

    const bookings= await this.bookingModel.find({
      status: { $in: ['pending', 'completed'] },
      date : booking.date,
      startHour: booking.startHour,
      fieldId: booking.fieldId
    }).exec();



    let bookingResponse: BookingResponseDto = {
      bookingId: booking._id,
      clusterName: cluster.name,
      fieldName: field.name,
      date: booking.date,
      startHour: booking.startHour,
      address: cluster.address,
      slot: bookings.length, // số lượng booking trong cùng một slot
      services: booking.services.map(service => ({
        name: service.name,
        price: service.price,
      })),
      price: price
    }
    return bookingResponse;
  }

  async getAllBookingsByUserId(userId: string): Promise<BookingHistoryDto[]> {
    const bookings = await this.bookingModel.find({ userId }).exec();
    if (!bookings) {
      throw new NotFoundException(`No bookings found for user ID ${userId}`);
    }
    const bookingHistory: BookingHistoryDto[] = [];
    for (const booking of bookings) {
      const cluster = await this.clusterModel.findById(booking.clusterId).exec();
      if (!cluster) {
        throw new NotFoundException(`Cluster with ID ${booking.clusterId} not found`);
      }
      const field = await this.fieldModel.findById(booking.fieldId).exec();
      if (!field) {
        throw new NotFoundException(`Field with ID ${booking.fieldId} not found`);
      }
      bookingHistory.push({
        bookingId: booking._id,
        clusterName: cluster.name,
        fieldName: field.name,
        date: booking.date,
        startHour: booking.startHour,
        address: cluster.address,
      });
    }
    return bookingHistory;
  }

  async updateBookingPayment(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    booking.status = 'completed';
    return booking.save();
  }

  //get all bookings by ownerId
  async getAllBookingsByOwnerId(ownerId: string): Promise<Booking[]> {
    const clusters = await this.clusterModel.find({ ownerId: ownerId }).exec();
    const clusterIds = clusters.map(cluster => cluster._id);
    let listField: Field[] = [];

    for (const clusterId of clusterIds) {
      const fields = await this.fieldModel.find({ clusterId }).exec();
      listField = listField.concat(fields); // nối mảng thay vì push mảng
    }
    const fieldIds = listField.map(field => field._id);

    let result: Booking[] = [];

    for (const fieldId of fieldIds) {
      const bookings = await this.bookingModel.find({ fieldId }).exec();
      result = result.concat(bookings); // nối mảng thay vì push mảng
    }
    return result;
  }

  async getAllCompletedBookingsByOwnerId(clusterId: string): Promise<Booking[]> {
    const bookings = await this.getAllBookingsByOwnerId(clusterId);
    return bookings.filter(booking => booking.status === 'completed');
  }

  async getAllPendingBookingsByOwnerId(clusterId: string): Promise<Booking[]> {
    const bookings = await this.getAllBookingsByOwnerId(clusterId);
    return bookings.filter(booking => booking.status === 'pending');
  }

}
