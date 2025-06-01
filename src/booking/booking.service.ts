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
import { User } from 'src/schemas/user.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Owner.name) private ownerModel: Model<Owner>,
    @InjectModel(Cluster.name) private clusterModel: Model<Cluster>,
    @InjectModel(Field.name) private fieldModel: Model<Field>,
    @InjectModel(User.name) private userModel: Model<User>,
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

    //user
    const user = await this.userModel.findById(booking.userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${booking.userId} not found`);
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
      userName: user.fullName,
      phoneNumber: user.phone,
      email: user.email,
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
        status: booking.status,
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
  async getAllBookingsByOwnerId(ownerId: string): Promise<BookingHistoryDto[]> {
    const clusters = await this.clusterModel.find({ ownerId: ownerId }).exec();
    const clusterIds = clusters.map(cluster => cluster._id);
    let listField: Field[] = [];

    for (const clusterId of clusterIds) {
      const fields = await this.fieldModel.find({ clusterId }).exec();
      listField = listField.concat(fields); // nối mảng thay vì push mảng
    }
    const fieldIds = listField.map(field => field._id);

    let history : BookingHistoryDto[] = [];

    for (const fieldId of fieldIds) {
      const bookings = await this.bookingModel.find({ fieldId }).exec();
      for (const booking of bookings) {
        const thisCluster = await this.clusterModel.findById(booking.clusterId).exec();
        if (!thisCluster) {
          throw new NotFoundException(`Cluster with ID ${booking.clusterId} not found`);
        }
        const thisField = await this.fieldModel.findById(booking.fieldId).exec();
        if (!thisField) {
          throw new NotFoundException(`Field with ID ${booking.fieldId} not found`);
        }

        // const slotBookings = await this.calculateSlotAvailability(booking._id);
        // const status = slotBookings === 1 ? 'pending' : 'completed';

        history.push({
          bookingId: booking._id,
          clusterName: thisCluster.name,
          fieldName: thisField.name,
          date: booking.date,
          startHour: booking.startHour,
          address: thisCluster.address,
          status: booking.status,
        }); 
      }
    }
    return history;
  }

  //get all upcoming bookings by ownerId
  async getAllUpcomingBookingsByOwnerId(clusterId: string): Promise<BookingHistoryDto[]> {
    const bookings = await this.getAllBookingsByOwnerId(clusterId);
    // compare the date and startHour to filter upcoming bookings
    const currentDate = new Date();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      const bookingStartHour = booking.startHour;
      // Check if the booking date is in the future or today with a later start hour
      return (
        bookingDate > currentDate 
      || (bookingDate.toDateString() === currentDate.toDateString() && bookingStartHour > currentDate.getHours())
      )
      && booking.status === 'completed';
    });
  }

  async getAllCompletedBookingsByOwnerId(clusterId: string): Promise<BookingHistoryDto[]> {
    const bookings = await this.getAllBookingsByOwnerId(clusterId);
    //compare the date and startHour to filter completed bookings
    const currentDate = new Date();
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      const bookingStartHour = booking.startHour;
      // Check if the booking date is in the past or today with an earlier start hour
      return (
        bookingDate < currentDate 
      || (bookingDate.toDateString() === currentDate.toDateString() && bookingStartHour < currentDate.getHours())
      )
      && booking.status === 'completed';
    });
  }

  async getAllPendingBookingsByOwnerId(clusterId: string): Promise<BookingHistoryDto[]> {
    const bookings = await this.getAllBookingsByOwnerId(clusterId);
    return bookings.filter(booking => booking.status === 'pending');
  }

  //calculate slot availability
  // async calculateSlotAvailability(bookingId: any): Promise<number> {
  //   const booking = await this.bookingModel.findById(bookingId).exec();
  //   if (!booking) {
  //     throw new NotFoundException(`Booking with ID ${bookingId} not found`);
  //   }
  //   const bookings = await this.bookingModel.find({
  //     status: { $in: ['pending', 'completed'] },
  //     date: booking.date,
  //     startHour: booking.startHour,
  //     fieldId: booking.fieldId
  //   }).exec();
  //   return bookings.length; // trả về số lượng booking trong cùng một slot
  // }

  //delete booking by bookingId
  async deleteBookingById(bookingId: string): Promise<void> {
    const booking = await this.bookingModel.findById(bookingId).exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${bookingId} not found`);
    }
    await this.bookingModel.deleteOne({ _id: bookingId }).exec();
  }
}
