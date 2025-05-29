import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from '../schemas/booking.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtPayLoad } from 'src/common/model/jwt.payload';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/schemas/user.schema';
import { BookingDto } from '../auth/dto/booking.dto';
import { BookingResponseDto } from 'src/auth/dto/bookingresponse.dto';
import { BookingHistoryDto } from 'src/auth/dto/bookinghistory.dto';

@ApiTags('bookings') // <-- trùng với tag ở bước 2
@UseGuards(JwtGuard)
@Controller('bookings')
@ApiBearerAuth()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  
  @Get('/user/:userId')
  @ApiOperation({ summary: 'Get all bookings by user ID' })
  @ApiResponse({ status: 200, description: 'List of bookings', type: [Booking] })
  @ApiParam({
      name: 'userId',
      required: true,
      description: 'The ID of the user to fetch bookings for',
      example: '6809cc764b5c931746abcf2d',
  })
  async getAllBookingsByUserId(@Param('userId') userId: string): Promise<BookingHistoryDto[]> {
    return this.bookingService.getAllBookingsByUserId(userId);
  }

  @Get(':bookingId')
  @ApiOperation({ summary: 'Get booking by bookingID' })
  @ApiResponse({ status: 200, description: 'Booking details', type: Booking })
  async getBookingById(@Param('bookingId') bookingId: string): Promise<BookingResponseDto> {
    return this.bookingService.getBookingById(bookingId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully', type: Booking })
  async createBooking(
    @Body() dto: BookingDto,
  ): Promise<Booking> {
    return this.bookingService.createBooking(dto);
  }

  @Patch(':bookingId/payment')
  @ApiOperation({ summary: 'Update booking payment status from pending to completed after payment' })
  @ApiResponse({ status: 200, description: 'Booking payment status updated', type: Booking })
  async updateBookingPayment(@Param('bookingId') bookingId: string): Promise<Booking> {
    return this.bookingService.updateBookingPayment(bookingId);
  }

  // Get all bookings by ownerId
  @Get('/owner/:ownerId')
  @ApiOperation({ summary: 'Get all bookings by owner ID' })
  @ApiResponse({ status: 200, description: 'List of bookings for the owner', type: [BookingHistoryDto] })
  async getAllBookingsByOwnerId(@Param('ownerId') ownerId: string): Promise<BookingHistoryDto[]> {
    return this.bookingService.getAllBookingsByOwnerId(ownerId);
  }

  //get all completed bookings by ownerId
  @Get('/owner/:ownerId/upcoming')
  @ApiOperation({ summary: 'Get all upcoming bookings by owner ID' })
  @ApiResponse({ status: 200, description: 'List of upcoming bookings for the owner', type: [BookingHistoryDto] })
  async getAllUpcomingBookingsByOwnerId(@Param('ownerId') ownerId: string): Promise<BookingHistoryDto[]> {
    return this.bookingService.getAllUpcomingBookingsByOwnerId(ownerId);
  }

  //get all completed bookings by ownerId
  @Get('/owner/:ownerId/completed')
  @ApiOperation({ summary: 'Get all completed bookings by owner ID' })
  @ApiResponse({ status: 200, description: 'List of completed bookings for the owner', type: [BookingHistoryDto] })
  async getAllCompletedBookingsByOwnerId(@Param('ownerId') ownerId: string): Promise<BookingHistoryDto[]> {
    return this.bookingService.getAllCompletedBookingsByOwnerId(ownerId);
  }

  //get all pending bookings by ownerId
  @Get('/owner/:ownerId/pending')
  @ApiOperation({ summary: 'Get all pending bookings by owner ID' })
  @ApiResponse({ status: 200, description: 'List of pending bookings for the owner', type: [BookingHistoryDto] })
  async getAllPendingBookingsByOwnerId(@Param('ownerId') ownerId: string): Promise<BookingHistoryDto[]> {
    return this.bookingService.getAllPendingBookingsByOwnerId(ownerId);
  }

  //delete booking by bookingId
  @Delete(':bookingId')
  @ApiOperation({ summary: 'Delete booking by booking ID' })
  @ApiResponse({ status: 200, description: 'Booking deleted successfully' })
  async deleteBooking(@Param('bookingId') bookingId: string): Promise<void> {
    return this.bookingService.deleteBookingById(bookingId);
  }
}
