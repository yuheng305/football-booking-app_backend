import { ApiProperty } from '@nestjs/swagger';

export class ServiceEntryDto {
  @ApiProperty({ example: 'Nước suối', description: 'Tên dịch vụ' })
  name: string;

  @ApiProperty({ example: 10000, description: 'Giá dịch vụ' })
  price: number;
}

export class BookingDto {
    @ApiProperty({ example: '6809cc764b5c931746abcf2d', description: 'ID người dùng' })
    userId: string;

    @ApiProperty({ example: '6809b04e7456305b0fb34f5b', description: 'ID cụm sân' })
    clusterId: string;

    @ApiProperty({ example: '6832d52657de4e23510f2dd0', description: 'ID sân bóng' })
    fieldId: string;

    @ApiProperty({ example: '2025-04-24', description: 'Ngày đặt sân (YYYY-MM-DD)' })
    date: string;

    @ApiProperty({ example: 7, description: 'Giờ bắt đầu (ví dụ: 7 cho 7:00)' })
    startHour: number;

    @ApiProperty({ example: 'pending', description: 'Trạng thái booking', enum: ['pending', 'completed', 'cancelled'] })
    status: 'pending' | 'completed' | 'cancelled';

    @ApiProperty({ type: [ServiceEntryDto], description: 'Danh sách dịch vụ đi kèm' })
    services: ServiceEntryDto[];

}