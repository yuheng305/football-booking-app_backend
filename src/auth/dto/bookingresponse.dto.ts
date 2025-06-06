import { ApiProperty } from '@nestjs/swagger';
import { ServiceEntryDto } from './booking.dto';

export class BookingResponseDto {

    //userName
    @ApiProperty({ example: 'john_doe', description: 'Tên người dùng đã đặt sân' })
    userName: string;
    //phoneNumber
    @ApiProperty({ example: '0123456789', description: 'Số điện thoại của người dùng đã đặt sân' })
    phoneNumber: string;
    //email
    @ApiProperty({ example: 'cp@gmail.com', description: 'Email của người dùng đã đặt sân' })
    email: string;

    //bookingId
    @ApiProperty({ example: '60c72b2f9b1e8c001c8e4d5a', description: 'ID của booking' })
    bookingId: any;
    @ApiProperty({ example: 'Cụm sân 1', description: 'Tên cụm sân' })
    clusterName: string;
    @ApiProperty({ example: 'Sân 1', description: 'Tên sân bóng' })
    fieldName: string;
    @ApiProperty({ example: '2025-04-24', description: 'Ngày đặt sân (YYYY-MM-DD)' })
    date: string;
    @ApiProperty({ example: '7:00', description: 'Giờ bắt đầu (ví dụ: 7 cho 7:00)' })
    startHour: number;
    //địa chỉ cụm sân
    @ApiProperty({ example: '123 Đường ABC, Quận 1, TP.HCM', description: 'Địa chỉ cụm sân' })
    address: string;
    //loại hình
    @ApiProperty({ example: 'Đặt nửa sân, full sân', description: '1 là nửa sân, 2 là full sân' })
    slot: number;

    @ApiProperty({ type: [ServiceEntryDto], description: 'Danh sách dịch vụ đi kèm' })
    services: ServiceEntryDto[];

    //price
    @ApiProperty({ example: 200000, description: 'Giá tiền của booking' })
    price: number;
}