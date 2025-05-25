import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from '../schemas/booking.schema';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtPayLoad } from 'src/common/model/jwt.payload';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/schemas/user.schema';
import { BookingDto } from '../auth/dto/booking.dto';

@ApiTags('bookings') // <-- trùng với tag ở bước 2
@UseGuards(JwtGuard)
@Controller('bookings')
@ApiBearerAuth()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  
  @Get(':userId')
  @ApiOperation({ summary: 'Get all bookings by user ID' })
  @ApiResponse({ status: 200, description: 'List of bookings', type: [Booking] })
  async getAllBookingsByUserId(@Param('userId') userId: string): Promise<Booking[]> {
    return this.bookingService.getAllBookingsByUserId(userId);
  }

  @Get(':bookingId')
  @ApiOperation({ summary: 'Get booking by ID' })
  @ApiResponse({ status: 200, description: 'Booking details', type: Booking })
  async getBookingById(@Param('bookingId') bookingId: string): Promise<Booking> {
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
}
