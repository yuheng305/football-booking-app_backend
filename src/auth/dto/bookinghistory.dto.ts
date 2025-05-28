import { ApiProperty } from '@nestjs/swagger';

export class BookingHistoryDto {

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

    @ApiProperty({ example: 'pending', description: 'Trạng thái của booking (pending, completed)' })
    status?: string;
}